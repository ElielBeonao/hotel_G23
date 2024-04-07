const express = require('express');
const router = express.Router();

const chambresController = require('../controllers/chambre.controller');

router.post('/chambres/filter', chambresController.getChambresByFilter);
router.post('/chambres', chambresController.createChambre);
router.get('/chambres', chambresController.getAllChambres);
router.get('/chambres/byId/:id_ch', chambresController.getChambreById);
router.get('/chambres/byEtablissementHotelier/:id_eh', chambresController.getChambresByEtablissementHotelier);
router.get('/chambres/disponibles', chambresController.getChambresDisponibles);
router.put('/chambres/:id_ch', chambresController.updateChambre);
router.delete('/chambres/:id_ch', chambresController.deleteChambre);

module.exports = router;