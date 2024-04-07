const CompteUtilisateur = require('../models/compte-utilisateur.model');
const UtilisateurInEtablissementHotelier = require('../models/utilisateur-in-etablissement-hotelier.model');
const bcrypt = require('bcrypt');

// Créer un nouveau compte utilisateur
async function createCompteUtilisateur(req, res) {
  const { nom_complet, username, password, user_type } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const compteUtilisateur = await CompteUtilisateur.create({ nom_complet, username, hashedPassword, user_type });
  res.status(201).json(compteUtilisateur);
}

// Récupérer tous les comptes utilisateurs
async function getAllComptesUtilisateurs(req, res) {
  const comptesUtilisateurs = await CompteUtilisateur.findAll();
  res.json(comptesUtilisateurs);
}

// Enregistrer UtilisateurInEtablissementHotelier
async function saveUtilisateurInEtablissementHotelier(req, res) {
  const { nas_utilisateur, id_eh, role_utilisateur } = req.body;
  const utilisateurInEtablissementHotelier = await UtilisateurInEtablissementHotelier.create({ nas_utilisateur, id_eh, role_utilisateur });
  res.status(201).json(utilisateurInEtablissementHotelier);
}

// Supprimer UtilisateurInEtablissementHotelier
async function deleteUtilisateurInEtablissementHotelier(req, res) {
  const { nas_utilisateur, id_eh } = req.params;
  const deleted = await UtilisateurInEtablissementHotelier.destroy({ where: { nas_utilisateur, id_eh } });
  if (!deleted) {
    return res.status(404).json({ message: 'UtilisateurInEtablissementHotelier non trouvé' });
  }
  res.json({ message: 'UtilisateurInEtablissementHotelier supprimé' });
}

async function getAllComptesUtilisateursByUserType(req, res) {
  const { user_type } = req.params;
  try {
    const comptesUtilisateurs = await CompteUtilisateur.findAll({ where: { user_type } });
    console.info(comptesUtilisateurs.length);
    res.json(comptesUtilisateurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des comptes utilisateurs.' });
  }
}


// Récupérer un compte utilisateur par son ID
async function getCompteUtilisateurById(req, res) {
  const { id_user } = req.params;
  const compteUtilisateur = await CompteUtilisateur.findByPk(id_user);
  if (!compteUtilisateur) {
    return res.status(404).json({ message: 'Compte utilisateur non trouvé' });
  }
  res.json(compteUtilisateur);
}

// Recuperer le compte de l'utilisateur connecte
async function getCompteUtilisateurConnecte(req, res) {
  const { username } = req.user;
  // console.info(JSON.stringify(req.user));
  const compteUtilisateur = await CompteUtilisateur.findOne({ where: { username: username } });
  if (!compteUtilisateur) {
    return res.status(404).json({ message: 'Compte utilisateur non trouvé' });
  }
  // console.info(JSON.stringify(compteUtilisateur));
  res.json({id: compteUtilisateur.username, fullName: compteUtilisateur.nom_complet, userType: compteUtilisateur.user_type});
}

// Récupérer un compte utilisateur par son username
async function getCompteUtilisateurByUsername(req, res) {
  const { username } = req.params;
  const compteUtilisateur = await CompteUtilisateur.findOne({ where: { username } });
  if (!compteUtilisateur) {
    return res.status(404).json({ message: 'Compte utilisateur non trouvé' });
  }
  res.json(compteUtilisateur);
}

// Mettre à jour un compte utilisateur
async function updateCompteUtilisateur(req, res) {
  const { id_user } = req.params;
  const { nom_complet, username, user_type } = req.body;
  const [updated] = await CompteUtilisateur.update({ nom_complet, username, user_type }, { where: { id_user } });
  if (!updated) {
    return res.status(404).json({ message: 'Compte utilisateur non trouvé' });
  }
  res.json({ message: 'Compte utilisateur mis à jour' });
}

// Supprimer un compte utilisateur
async function deleteCompteUtilisateur(req, res) {
  const { id_user } = req.params;
  const deleted = await CompteUtilisateur.destroy({ where: { id_user } });
  if (!deleted) {
    return res.status(404).json({ message: 'Compte utilisateur non trouvé' });
  }
  res.json({ message: 'Compte utilisateur supprimé' });
}

module.exports = {
    createCompteUtilisateur,
    getAllComptesUtilisateurs,
    getCompteUtilisateurById,
    getAllComptesUtilisateursByUserType,
    getCompteUtilisateurConnecte,
    getCompteUtilisateurByUsername,
    updateCompteUtilisateur,
    deleteCompteUtilisateur,
    saveUtilisateurInEtablissementHotelier,
    deleteUtilisateurInEtablissementHotelier
    };