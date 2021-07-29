/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const { Router } = require('express');
const { prettifyErrors } = require('../lib/utils');
const { Transaction } = require('../models/sequelize');

const router = Router();

router
  .get('/', (req, res) => {
    const { page = 1, perPage = 10, ...query } = req.query;
    Transaction.findAll({
      where: query,
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      paranoid: false,
    })
      .then((data) => res.json(data))
      .catch((e) => res.sendStatus(500));
  })
  .post('/', (req, res) => {
    console.log('show req body !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', req.body);
    new Transaction(req.body)
      .save()
      .then((data) => {
        res.status(201).json();
        console.log('reeeeeeeeees', res);
      })
      .catch((e) => {
        if (e.name === 'SequelizeValidationError') {
          res.status(400).json(prettifyErrors(e));
        } else {
          res.status(500).json('Error system');
          console.error(e);
        }
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Transaction.findByPk(id)
      .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
      .catch((e) => res.sendStatus(500));
  });

module.exports = router;
