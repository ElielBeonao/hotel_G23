const express = require('express');
const router = express.Router();

const etablissementsHoteliersController = require('../controllers/etablissement-hotelier.controller');

router.post('/etablissements-hoteliers', etablissementsHoteliersController.createEtablissementHotelier);
router.get('/etablissements-hoteliers', etablissementsHoteliersController.getAllEtablissementsHoteliers);
router.get('/etablissements-hoteliers/byId/:id_eh', etablissementsHoteliersController.getEtablissementHotelierById);
router.put('/etablissements-hoteliers/:id_eh', etablissementsHoteliersController.updateEtablissementHotelier);
router.delete('/etablissements-hoteliers/:id_eh', etablissementsHoteliersController.deleteEtablissementHotelier);
router.get('/etablissements-hoteliers/me', etablissementsHoteliersController.getEtablissementsHoteliersByUser);

module.exports = router;