const { Router } = require('express');
const { prettifyErrors } = require('../lib/utils');
const { Credentials } = require('../models/sequelize');

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
    User.findByPk(id)
      .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
      .catch((e) => res.sendStatus(500));
  })

// Création d'un credential
  .post('/', (req, res) => {
    new Credentials(req.body)
      .save()
      .then((data) => res.status(201).json(data))
      .catch((e) => {
        if (e.name === 'SequelizeValidationError') {
          res.status(400).json(prettifyErrors(e));
        } else console.error(e) || res.sendStatus(500);
      });
  })

  .delete('/:id', (req, res) => {
    // <==> HttpCode.deleteOne({ _id: req.params.code })
    Credentials.destroy({ where: { id: req.params.id } })
      .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
      .catch((e) => res.sendStatus(500));
  });

  module.exports = router;
