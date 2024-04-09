const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/location.controller');

router.post('/locations', locationsController.createLocation);
router.get('/locations', locationsController.getAllLocations);
router.get('/locations/me', locationsController.getLocationsByUser);
router.get('/locations/byEtablissementHotelier/:id_eh', locationsController.getLocationsByEtablissementHotelier);
router.get('/locations/byChambre/:id_ch', locationsController.getLocationsByChambre);
router.put('/locations/:id_loc', locationsController.updateLocation);
router.delete('/locations/:id_loc', locationsController.deleteLocation);

module.exports = router;