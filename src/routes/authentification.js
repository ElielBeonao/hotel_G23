const authentificationController = require('../controllers/authentification.controller');

const express = require('express');
const router = express.Router();

router.post('/login', authentificationController.login);
router.post('/register', authentificationController.createAccount);

module.exports = router;