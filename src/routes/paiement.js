const express = require('express');
const router = express.Router();

const paiementsController = require('../controllers/paiement.controller');

router.post('/paiements', paiementsController.createPaiement);
router.get('/paiements', paiementsController.getAllPaiements);
router.get('/paiements/me', paiementsController.getPaiementsByUser);
router.get('/paiements/byClient/:id_eh', paiementsController.getPaiementsByClient);
router.get('/paiements/byLocation/:id_loc', paiementsController.getPaiementsByLocation);
router.put('/paiements/:id_res', paiementsController.updatePaiement);
// router.delete('/paiements/:id_res', paiementsController.deletePaiement);

module.exports = router;