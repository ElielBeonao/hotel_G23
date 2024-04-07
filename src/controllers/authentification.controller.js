const CompteUtilisateur = require('../models/compte-utilisateur.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Authentififer un utilisateur par login, password et retourner un JWT
async function login(req, res) {
  const { username, password } = req.body;
  const utilisateur = await CompteUtilisateur.findOne({ where: { username } });
    if (!utilisateur) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

  const isPasswordValid = await bcrypt.compare(password, utilisateur.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: utilisateur.id_user, username: utilisateur.username, fullName: utilisateur.nom_complet,  user_type: utilisateur.user_type }, jwtSecret, { expiresIn: '1d' });

  res.json({ access_token: token, user_type: utilisateur.user_type});
}

// Creation de compte utilisateur
async function createAccount(req, res) {
  console.log(`${JSON.stringify(req.body)}`);
  const { nom_complet, username, password } = req.body;

  const utilisateurExistant = await CompteUtilisateur.findOne({ where: { username } });
  if (utilisateurExistant) {
    return res.status(400).json({ message: 'Nom d\'utilisateur existe déjà' });
  }

  const user_type = 'CLIENT';
  const hashedPassword = await bcrypt.hash(password, 10);
  const userBody = { nom_complet, username, password, user_type };
  userBody.password = hashedPassword;
  const utilisateur = await CompteUtilisateur.create(userBody);

  res.status(201).json(utilisateur);
}

module.exports = {
    login,
    createAccount
};
