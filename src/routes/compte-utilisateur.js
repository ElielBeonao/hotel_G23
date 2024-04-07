const express = require('express');

const router = express.Router();
const compteUtilisateurController = require('../controllers/compte-utilisateur.controller');

router.post('/users', compteUtilisateurController.createCompteUtilisateur);
router.get('/users', compteUtilisateurController.getAllComptesUtilisateurs);
router.get('/users/userType/:user_type', compteUtilisateurController.getAllComptesUtilisateursByUserType);
router.get('/users/id/:id_user', compteUtilisateurController.getCompteUtilisateurById);
router.get('/users/username/:username', compteUtilisateurController.getCompteUtilisateurByUsername);
router.get('/account/me', compteUtilisateurController.getCompteUtilisateurConnecte);
router.put('/users/:id_user', compteUtilisateurController.updateCompteUtilisateur);
router.delete('/users/:id_user', compteUtilisateurController.deleteCompteUtilisateur);
router.post('/users/attach-hotel', compteUtilisateurController.saveUtilisateurInEtablissementHotelier);
router.delete('/users/detach-hotel/:id_user/:id_eh', compteUtilisateurController.deleteUtilisateurInEtablissementHotelier);

module.exports = router;