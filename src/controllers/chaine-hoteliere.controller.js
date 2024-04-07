const ChaineHoteliere = require('../models/chaine-hoteliere.model');

// Créer une nouvelle chaîne hôtelière
async function createChaineHoteliere(req, res) {
  const { nom_ch } = req.body;
  const chaineHoteliere = await ChaineHoteliere.create({ nom_ch });
  res.status(201).json(chaineHoteliere);
}

// Récupérer toutes les chaînes hôtelières
async function getAllChainesHotelieres(req, res) {
  const chainesHotelieres = await ChaineHoteliere.findAll();
  res.json(chainesHotelieres);
}

// Récupérer une chaîne hôtelière par son ID
async function getChaineHoteliereById(req, res) {
  const { id_ch } = req.params;
  const chaineHoteliere = await ChaineHoteliere.findByPk(id_ch);
  if (!chaineHoteliere) {
    return res.status(404).json({ message: 'Chaîne hôtelière non trouvée' });
  }
  res.json(chaineHoteliere);
}

// Mettre à jour une chaîne hôtelière
async function updateChaineHoteliere(req, res) {
  const { id_ch } = req.params;
  const { nom_ch } = req.body;
  const [updated] = await ChaineHoteliere.update({ nom_ch }, { where: { id_ch } });
  if (!updated) {
    return res.status(404).json({ message: 'Chaîne hôtelière non trouvée' });
  }
  res.json({ message: 'Chaîne hôtelière mise à jour' });
}

// Supprimer une chaîne hôtelière
async function deleteChaineHoteliere(req, res) {
  const { id_ch } = req.params;
  const deleted = await ChaineHoteliere.destroy({ where: { id_ch } });
  if (!deleted) {
    return res.status(404).json({ message: 'Chaîne hôtelière non trouvée' });
  }
  res.json({ message: 'Chaîne hôtelière supprimée' });
}

module.exports = {
    createChaineHoteliere,
    getAllChainesHotelieres,
    getChaineHoteliereById,
    updateChaineHoteliere,
    deleteChaineHoteliere
    };