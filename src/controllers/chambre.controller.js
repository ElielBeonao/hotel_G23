const ChambreModel = require('../models/chambre.model');
const EtablissementHotelierModel = require('../models/etablissement-hotelier.model');
const ChaineHoteliereModel = require('../models/chaine-hoteliere.model');

// Creer une chambre
async function createChambre(req, res) {
    const { num_ch, type_ch, prix_ch, id_eh } = req.body;
    const chambre = await ChambreModel.create({ num_ch, type_ch, prix_ch, id_eh });
    res.status(201).json(chambre);
}

// Recuperer toutes les chambres
async function getAllChambres(req, res) {
    const chambres = await ChambreModel.findAll();
    res.json(chambres);
}

// Recuperer les chambres par l'etablissement hotelier
async function getChambresByEtablissementHotelier(req, res) {
    const { id_eh } = req.params;
    const chambres = await ChambreModel.findAll({ where: { id_eh } , include: [{model: EtablissementHotelierModel, as:'etablissementHotelier', require:true}]});
    res.json(chambres);
}

// recuperer les chambres qui sont disponibles
async function getChambresDisponibles(req, res) {
    const chambres = await ChambreModel.findAll({ where: { disponible_c: true } });
    res.json(chambres);
}

// recuperer les chambres selon le filtre defini
async function getChambresByFilter(req, res) {
    const { startDate, endDate, capacity, area, hotelChain, hotelCategory, numberOfRooms, price } = req.body;
    const whereClause = {disponible_c: true};
    // if (startDate) {
    //     whereClause.date_debut = { [Op.gte]: startDate };
    // }
    // if (endDate) {
    //     whereClause.date_fin = { [Op.lte]: endDate };
    // }
    if (capacity) {
        whereClause.capacite_c = capacity;
    }
    if (area) {
        whereClause.intitule_c = area;
    }
    if (hotelChain) {
        whereClause['$etablissementHotelier.chaineHoteliere.id_ch$'] = hotelChain;
    }
    if (hotelCategory) {
        whereClause['$etablissementHotelier.classe_eh$'] = hotelCategory;
    }
    if (numberOfRooms) {
        whereClause['$etablissementHotelier.nbr_chambres$'] = numberOfRooms;
    }
    if (price) {
        whereClause.prix_c = price;
    }

    const includeObj = [
        {
          model: EtablissementHotelierModel,
          as: 'etablissementHotelier',
          required: true,
          include: [
            {
              model: ChaineHoteliereModel,
              as: 'chaineHoteliere',
              required: true,
            },
          ],
        },
      ];

    const chambres = await ChambreModel.findAll({ where: whereClause, include: includeObj });
    res.json(chambres);
}

// Recuperer une chambre par son ID
async function getChambreById(req, res) {
    const { id_ch } = req.params;
    const chambre = await ChambreModel.findByPk(id_ch);
    if (!chambre) {
        return res.status(404).json({ message: 'Chambre non trouvée' });
    }
    res.json(chambre);
}

// Mettre a jour une chambre
async function updateChambre(req, res) {
    const { id_ch } = req.params;
    const { num_ch, type_ch, prix_ch, id_eh } = req.body;
    const [updated] = await ChambreModel.update({ num_ch, type_ch, prix_ch, id_eh }, { where: { id_ch } });
    if (!updated) {
        return res.status(404).json({ message: 'Chambre non trouvée' });
    }
    res.json({ message: 'Chambre mise à jour' });
}

// Supprimer une chambre

async function deleteChambre(req, res) {

    const { id_ch } = req.params;
    const deleted = await ChambreModel.destroy({ where: { id_ch } });
    if (!deleted) {
        return res.status(404).json({ message: 'Chambre non trouvée' });
    }
    res.json({ message: 'Chambre supprimée' });
}

module.exports = {
    createChambre,
    getAllChambres,
    getChambreById,
    updateChambre,
    deleteChambre,
    getChambresDisponibles,
    getChambresByEtablissementHotelier,
    getChambresByFilter
};