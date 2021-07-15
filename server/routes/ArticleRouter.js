/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const { Router } = require('express');
const { prettifyErrors } = require('../lib/utils');
const { Article } = require('../models/sequelize');
const bcryptjs = require('bcryptjs');

const router = Router();

router
// Création d'un article 
// TO-DO: accesssible par un trader
  .post('/', (req, res) => {
    new Article(req.body)
      .save()
      .then((data) => res.status(201).json(data))
      .catch((e) => {
        if (e.name === 'SequelizeValidationError') {
          res.status(400).json(prettifyErrors(e));
        } else console.error(e) || res.sendStatus(500);
      });
  })


module.exports = router;
