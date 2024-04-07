// Routes with controllers for chaine hoteliere

const express = require('express');
const router = express.Router();
const chaineHotelieresController = require('../controllers/chaine-hoteliere.controller');

router.post('/chaines-hotelieres', chaineHotelieresController.createChaineHoteliere);
router.get('/chaines-hotelieres', chaineHotelieresController.getAllChainesHotelieres);
router.get('/chaines-hotelieres/:id_ch', chaineHotelieresController.getChaineHoteliereById);
router.put('/chaines-hotelieres/:id_ch', chaineHotelieresController.updateChaineHoteliere);
router.delete('/chaines-hotelieres/:id_ch', chaineHotelieresController.deleteChaineHoteliere);

module.exports = router;