const ReservationModel = require('../models/reservation.model');
const UtilisateurCompteModel = require('../models/compte-utilisateur.model');
const ChambreModel = require('../models/chambre.model');
const EtablissementHotelierModel = require('../models/etablissement-hotelier.model');

// Creer une reservation
async function createReservation(req, res) {
    const { id_res, date_debut, date_fin, client, employe, chambre, statut_res } = req.body;
    let id_emp = null;
    let id_cli = null;
    const id_c = chambre.id_c;
    const clientFound = await UtilisateurCompteModel.findOne({ where: { username: client.id } });
    // console.log(`clientFound: ${clientFound}`);
    if(clientFound !== null && clientFound !== undefined && clientFound.id_user !== undefined) {
        id_cli = clientFound.id_user;
    }
    
    if( employe !== null && employe !== undefined && employe.id !== undefined) {
        const employeFound = await UtilisateurCompteModel.findOne({ where: { username: employe.id } });
        if(employeFound) {
            id_emp = employeFound.id_user;
        }
    }
    // console.log(`id_cli: ${id_cli}, id_emp: ${id_emp}, id_c: ${id_c}`);
    const reservation = await ReservationModel.create({ id_res, date_debut, date_fin, id_cli, id_emp, id_c, statut_res });
    res.status(201).json(reservation);
}

// Recuperer toutes les reservations
async function getAllReservations(req, res) {
    const reservations = await ReservationModel.findAll();
    res.json(reservations);
}

// Recuperer les reservations par l'utilisateur connecte
async function getReservationsByUser(req, res) {
    const { id } = req.user;
    console.log(`id: ${id}`);
    const reservations = await ReservationModel.findAll({ where: { id_cli: id } , include: [
        {model: UtilisateurCompteModel, as:'client', require:true},
        {model: ChambreModel, as:'chambre', require:true, include: [{model: EtablissementHotelierModel, as:'etablissementHotelier', require:true}]}
    ]});
    res.json(reservations);
}

async function getReservationsById(req, res) {
    const { id_res } = req.params;
    console.log(`id: ${id_res}`);
    const reservation = await ReservationModel.findOne({ where: { id_res: id_res } , include: [
        {model: UtilisateurCompteModel, as:'client', require:true},
        {model: UtilisateurCompteModel, as:'employe'},
        {model: ChambreModel, as:'chambre', require:true, include: [{model: EtablissementHotelierModel, as:'etablissementHotelier', require:true}]}
    ]});
    res.json(reservation);
}


// Recuperer les reservations par l'etablissement hotelier
async function getReservationsByEtablissementHotelier(req, res) {
    const { id_eh } = req.params;
    const reservations = await ReservationModel.findAll({ include: [
        { model: UtilisateurCompteModel, as:'client'},
        { model: UtilisateurCompteModel, as:'employe'},
        { model: ChambreModel, as:'chambre', where: { id_eh }, 
        include: [{model: EtablissementHotelierModel, as:'etablissementHotelier'}]},
    ]});
    res.json(reservations);
}

// Recuperer les reservations par la chambre
async function getReservationsByChambre(req, res) {
    const { id_ch } = req.params;
    const reservations = await ReservationModel.findAll({ where: { id_ch } });
    res.json(reservations);
}

// Mettre a jour une reservation
async function updateReservation(req, res) {
    const { id_res } = req.params;
    const { date_debut, date_fin, client, employe, chambre, statut_res } = req.body;
    let id_emp = null;
    let id_cli = null;
    const id_c = chambre.id_c;
    const clientFound = await UtilisateurCompteModel.findOne({ where: { username: client.id_user } });
    // console.log(`clientFound: ${clientFound}`);
    if( client.id_user !== undefined) {
        id_cli = client.id_user;
    }
    
    if( employe !== null && employe !== undefined && employe.id !== undefined) {
        const employeFound = await UtilisateurCompteModel.findOne({ where: { username: employe.id } });
        if(employeFound) {
            id_emp = employeFound.id_user;
        }
    }
    console.log(`date_debut: ${date_debut}, date_fin: ${date_fin}, client: ${id_cli}, employe: ${id_emp}, chambre: ${id_c}, statut_res: ${statut_res}, id_res: ${id_res}`);

    const [updated] = await ReservationModel.update({ date_debut, date_fin, id_emp, id_cli, id_c, statut_res }, { where: { id_res } });
    if (!updated) {
        return res.status(404).json({ message: 'Reservation non trouvee' });
    }
    res.json({ message: 'Reservation mise a jour' });
}

// Supprimer une reservation
async function deleteReservation(req, res) {
    const { id_res } = req.params;
    const deleted = await ReservationModel.destroy({ where: { id_res } });
    if (!deleted) {
        return res.status(404).json({ message: 'Reservation non trouvee' });
    }
    res.json({ message: 'Reservation supprimee' });
}

module.exports = {
    createReservation,
    getAllReservations,
    getReservationsById,
    getReservationsByUser,
    getReservationsByEtablissementHotelier,
    getReservationsByChambre,
    updateReservation,
    deleteReservation
};