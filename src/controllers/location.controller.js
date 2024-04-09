const LocationModel = require('../models/location.model');
const UtilisateurCompteModel = require('../models/compte-utilisateur.model');
const ChambreModel = require('../models/chambre.model');
const ReservationModel = require('../models/reservation.model');
const EtablissementHotelierModel = require('../models/etablissement-hotelier.model');

// Creer une location
async function createLocation(req, res) {
    const { date_debut, date_fin, client, employe, chambre, statut_loc } = req.body;
    let id_emp = null;
    let id_cli = null;
    const id_c = chambre.id_c;
    const clientFound = await UtilisateurCompteModel.findOne({ where: { username: client.id } });
    if(clientFound !== null && clientFound !== undefined && clientFound.id_user !== undefined) {
        id_cli = clientFound.id_user;
    }
    
    if( employe !== null && employe !== undefined && employe.id !== undefined) {
        const employeFound = await UtilisateurCompteModel.findOne({ where: { username: employe.id } });
        if(employeFound) {
            id_emp = employeFound.id_user;
        }
    }
    const location = await LocationModel.create({ date_debut, date_fin, id_cli, id_emp, id_c, statut_loc });
    res.status(201).json(location);
}

// Modifier une location
async function updateLocation(req, res) {
    const { id_loc } = req.params;
    const { date_debut, date_fin, client, employe, chambre, statut_loc } = req.body;
    let id_emp = null;
    const id_cli = client.id_user;
    const id_c = chambre.id_c;
    
    if( employe !== null && employe !== undefined && employe.id !== undefined) {
        const employeFound = await UtilisateurCompteModel.findOne({ where: { username: employe.id } });
        if(employeFound) {
            id_emp = employeFound.id_user;
        }
    }
    const location = await LocationModel.update({ date_debut, date_fin, id_cli, id_emp, id_c, statut_loc }, { where: { id_loc } });
    res.status(201).json(location);
}

// Recuperer toutes les locations
async function getAllLocations(req, res) {
    const locations = await LocationModel.findAll();
    res.json(locations);
}

// Recuperer les locations par l'utilisateur connecte
async function getLocationsByUser(req, res) {
    const { id } = req.user;
    const locations = await LocationModel.findAll({ where: { id_cli: id } , include: [
        {model: UtilisateurCompteModel, as:'client', require:true}
    ]});
    res.json(locations);
}

// Recuperer les locations par l'etablissement hotelier
async function getLocationsByEtablissementHotelier(req, res) {
    const { id_eh } = req.params;
    const locations = await LocationModel.findAll({ 
        // where: { 'chambre.ethablissementHotelier.id_eh': id_eh }, 
        include: [
        {model: ReservationModel, as: 'reservation'},
        { model: UtilisateurCompteModel, as:'client'},
        { model: UtilisateurCompteModel, as:'employe'},
        { model: ChambreModel, as:'chambre', include: [{model: EtablissementHotelierModel, as: 'etablissementHotelier', where: {id_eh}}]}
    ]});
    
    res.json(locations);
}

// Recuperer les locations par la chambre
async function getLocationsByChambre(req, res) {
    const { id_c } = req.params;
    const locations = await LocationModel.findAll({ where: { id_c: id_c }});
    res.json(locations);
}

async function deleteLocation(req, res) {
    const { id_loc } = req.params;
    const deleted = await LocationModel.destroy({ where: { id_loc } });
    if (!deleted) {
        return res.status(404).json({ message: 'Location non trouvee' });
    }
    res.json({ message: 'Location supprimée' });
}

module.exports = {
    createLocation,
    getAllLocations,
    getLocationsByUser,
    getLocationsByEtablissementHotelier,
    getLocationsByChambre,
    updateLocation,
    deleteLocation
};