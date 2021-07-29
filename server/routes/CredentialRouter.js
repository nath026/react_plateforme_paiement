const { Router } = require('express');
const { prettifyErrors } = require('../lib/utils');
const { Credentials } = require('../models/sequelize');
const { Trader } = require('../models/sequelize');

const router = Router();

router

// Affichage de tous les credentials
  .get('/', (req, res) => {
    const { page = 1, perPage = 10, ...query } = req.query;
    Credentials.findAll({
      where: query,
      // attributes: ["firstname", "confirmed"],
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      paranoid: false,
    })
      .then((data) => res.json(data))
      .catch((e) => res.sendStatus(500));
  })

  // Affichage d'un credential
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Credentials.findAll({
      where: {
        traderId: id,
      },
    })
      .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
      .catch((e) => res.sendStatus(500));
  })

// Création d'un credential
  .post('/', (req, res) => {
    console.log('show me the req body!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', req.body);
    new Credentials(req.body)
      .save()
      .then((data) => {
        res.status(201).json(data);
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

  .delete('/:id', (req, res) => {
    // <==> HttpCode.deleteOne({ _id: req.params.code })
    Credentials.destroy({ where: { id: req.params.id } })
      .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
      .catch((e) => res.sendStatus(500));
  });

module.exports = router;
