const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const {jwtSecret} = require('../config');


const jwtInterceptor = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ error: 'En-tête d\'autorisation manquante' });
  }
  // console.log(authorizationHeader);
  const token = authorizationHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    // console.log('continue to target endpoint');
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: 'Token Invalide!' });
  }
};

module.exports = jwtInterceptor;

