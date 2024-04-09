const authentificationRouter = require('./authentification');
const chaineHoteliereRouter = require('./chaine-hoteliere');
const etablissementHotelierRouter = require('./etablissement-hotelier');
const compteUtilisateurRouter = require('./compte-utilisateur');
const chambreRouter = require('./chambre');
const reservationRouter = require('./reservation');
const locationController = require('./location');
const paiementController = require('./paiement');

module.exports = {  authenticationNotRequired: [authentificationRouter], 
                    authenticationRequired:[chaineHoteliereRouter, 
                        etablissementHotelierRouter, 
                        compteUtilisateurRouter, 
                        chambreRouter, 
                        reservationRouter, 
                        locationController, 
                        paiementController]};