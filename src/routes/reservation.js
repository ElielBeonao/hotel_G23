const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservation.controller');

router.post('/reservations', reservationsController.createReservation);
router.get('/reservations', reservationsController.getAllReservations);
router.get('/reservations/me', reservationsController.getReservationsByUser);
router.get('/reservations/byEtablissementHotelier/:id_eh', reservationsController.getReservationsByEtablissementHotelier);
router.get('/reservations/byChambre/:id_ch', reservationsController.getReservationsByChambre);
router.put('/reservations/:id_res', reservationsController.updateReservation);
router.delete('/reservations/:id_res', reservationsController.deleteReservation);

module.exports = router;