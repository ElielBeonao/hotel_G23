const PaiementModel = require('../models/paiement.model');
const UtilisateurCompteModel = require('../models/compte-utilisateur.model');
const LocationModel = require('../models/location.model');

// Creer un paiement
async function createPaiement(req, res) {
    const { date_paiement, montant, employe, location } = req.body;
    let id_emp = null;
    let id_loc = location.id_loc;
    const employeFound = await UtilisateurCompteModel.findOne({ where: { username: employe.id } });
    if(employeFound !== null && employeFound !== undefined && employeFound.id_user !== undefined) {
        id_emp = employeFound.id_user;
    }
    const paiement = await PaiementModel.create({ date_paiement, montant, id_emp, id_loc });
    res.status(201).json(paiement);
}

// Modifier un paiement
async function updatePaiement(req, res) {
    const { p_id } = req.params;
    const { date_paiement, montant, employe, location } = req.body;
    let id_emp = null;
    let id_loc = location.id_loc;
    const employeFound = await UtilisateurCompteModel.findOne({ where: { username: employe.id } });
    if(employeFound !== null && employeFound !== undefined && employeFound.id_user !== undefined) {
        id_emp = employeFound.id_user;
    }
    const paiement = await PaiementModel.update({ date_paiement, montant, id_emp, id_loc }, { where: { p_id } });
    res.status(201).json(paiement);
}

// Recuperer tous les paiements
async function getAllPaiements(req, res) {
    const paiements = await PaiementModel.findAll();
    res.json(paiements);
}

// Recuperer les paiements par l'utilisateur connecte(Employe)
async function getPaiementsByUser(req, res) {
    const { id } = req.user;
    const paiements = await PaiementModel.findAll({ where: { nas_emp: id } , include: [
        {model: UtilisateurCompteModel, as:'employe', require:true},
        {model: LocationModel, as:'location', require:true}
    ]});
    res.json(paiements);
}

// Recuperer les paiements par l'utilisateur connecte(Client)
async function getPaiementsByClient(req, res) {
    const { id } = req.user;
    const paiements = await PaiementModel.findAll({ where: { id_cli: id } , include: [
        {model: UtilisateurCompteModel, as:'client', require:true},
        {model: LocationModel, as:'location', require:true}
    ]});
    res.json(paiements);
}

// Recuperer les paiements par la location
async function getPaiementsByLocation(req, res) {
    const { id_loc } = req.params;
    const paiements = await PaiementModel.findAll({ where: { id_loc } , include: [
        {model: UtilisateurCompteModel, as:'employe', require:true},
        {model: UtilisateurCompteModel, as:'client', require:true}
    ]});
    res.json(paiements);
}

module.exports = {
    createPaiement,
    updatePaiement,
    getAllPaiements,
    getPaiementsByUser,
    getPaiementsByClient,
    getPaiementsByLocation
};