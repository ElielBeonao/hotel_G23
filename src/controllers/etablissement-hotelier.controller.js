const { Op } = require('sequelize');
const { db } = require('../config/index');

const ChaineHoteliereModel = require('../models/chaine-hoteliere.model');
const EtablissementHotelier = require('../models/etablissement-hotelier.model');
// const UtilisateurInEtablissementHotelierModel  = require('../models/utilisateur-in-etablissement-hotelier.model');

// Créer un nouvel établissement hôtelier
async function createEtablissementHotelier(req, res) {
  const { nom_eh, classe_eh, adresse_eh, nbr_chambres, id_ch } = req.body;
  const etablissementHotelier = await EtablissementHotelier.create({ nom_eh, classe_eh, adresse_eh, nbr_chambres, id_ch });
  res.status(201).json(etablissementHotelier);
}

// Récupérer tous les établissements hôteliers
async function getAllEtablissementsHoteliers(req, res) {
  const etablissementsHoteliers = await EtablissementHotelier.findAll();
  res.json(etablissementsHoteliers);
}

// Recuperer les etablissements hoteliers par l'utilisateur connecte
// SELECT "EtablissementHotelier"."id_eh", "EtablissementHotelier"."nom_eh", "EtablissementHotelier"."classe_eh", "EtablissementHotelier"."adresse_eh", "EtablissementHotelier"."nbr_chambres", "EtablissementHotelier"."id_ch", "chaineHoteliere"."id_ch" AS "chaineHoteliere.id_ch", "chaineHoteliere"."nom_ch" AS "chaineHoteliere.nom_ch" FROM "etablissement_hotelier" AS "EtablissementHotelier" LEFT OUTER JOIN "chaine_hoteliere" AS "chaineHoteliere" ON "EtablissementHotelier"."id_ch" = "chaineHoteliere"."id_ch" WHERE "EtablissementHotelier"."id_eh" IN ( SELECT id_eh FROM utilisateur_role_etablissement_hotelier WHERE nas_utilisateur = id)
async function getEtablissementsHoteliersByUser(req, res) {
  const { id } = req.user;
  const subQuery = await db.literal(`( SELECT id_eh FROM utilisateur_role_etablissement_hotelier WHERE nas_utilisateur = ${id})`);

  const etablissementsHoteliers = await EtablissementHotelier.findAll({
    where: { id_eh: { [Op.in]: subQuery }},
    include: [
      { model: ChaineHoteliereModel, as: 'chaineHoteliere' }
    ]
  });
  res.json(etablissementsHoteliers);
}

// Récupérer un établissement hôtelier par son ID
async function getEtablissementHotelierById(req, res) {
  const { id_eh } = req.params;
  const etablissementHotelier = await EtablissementHotelier.findOne({where: {id_eh},     include: [
    { model: ChaineHoteliereModel, as: 'chaineHoteliere' }
  ]});
  if (!etablissementHotelier) {
    return res.status(404).json({ message: 'Établissement hôtelier non trouvé' });
  }
  res.json(etablissementHotelier);
}

// Mettre à jour un établissement hôtelier
async function updateEtablissementHotelier(req, res) {
  const { id_eh } = req.params;
  const { nom_eh, classe_eh, adresse_eh, nbr_chambres, id_ch } = req.body;
  const [updated] = await EtablissementHotelier.update({ nom_eh, classe_eh, adresse_eh, nbr_chambres, id_ch }, { where: { id_eh } });
  if (!updated) {
    return res.status(404).json({ message: 'Établissement hôtelier non trouvé' });
  }
  res.json({ message: 'Établissement hôtelier mis à jour' });
}

// Supprimer un établissement hôtelier
async function deleteEtablissementHotelier(req, res) {
  const { id_eh } = req.params;
  const deleted = await EtablissementHotelier.destroy({ where: { id_eh } });
  if (!deleted) {
    return res.status(404).json({ message: 'Établissement hôtelier non trouvé' });
  }
  res.json({ message: 'Établissement hôtelier supprimé' });
}

module.exports = {
    createEtablissementHotelier,
    getAllEtablissementsHoteliers,
    getEtablissementHotelierById,
    getEtablissementsHoteliersByUser,
    updateEtablissementHotelier,
    deleteEtablissementHotelier
    };