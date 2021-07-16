/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const { Router } = require('express');
const { prettifyErrors } = require('../lib/utils');
const { Trader } = require('../models/sequelize');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { restore } = require('../models/sequelize/User');

const router = Router();

router
// Affichage de tous les traders
  .get('/', (req, res) => {
    const { page = 1, perPage = 10, ...query } = req.query;
    Trader.findAll({
      where: query,
      // attributes: ["firstname", "confirmed"],
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      paranoid: false
    })
      .then((data) => res.json(data))
      .catch((e) => res.sendStatus(500));
  })
// Inscription d'un trader
  .post('/', (req, res) => {
    new Trader(req.body)
      .save()
      .then((data) => res.status(201).json(data))
      .catch((e) => {
        if (e.name === 'SequelizeValidationError') {
          res.status(400).json(prettifyErrors(e));
        } else console.error(e) || res.sendStatus(500);
      });
  })
// Se login en tant que Trader
  .post('/login', async (req, res) => {
     const { username, password } = req.body;
    const trader = await Trader.findOne({ where: {username: username}});
    if (!trader) res.json({ error: "User n'existe pas"});
    try {
      const passwordValid = await bcryptjs.compare(password, trader.password)
      if (!passwordValid) {
       res.status(500).json({ error: "Mauvaise combinaison entre mdp et username"})
      }
      // } else {
      //   res.json("Vous êtes logger")
      // }
      const token = jwt.sign({ traderId: trader.id }, 'salut');
      res.status(200).json({token:token});      
    }
    catch(e) {
      console.log(e);
    }
  })

// Afficher un Trader en particulier
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Trader.findByPk(id)
      .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
      .catch((e) => res.sendStatus(500));
  })
// MAJ d'un trader
// TO DO : route accessible que pour les admins
  .put('/:id', (req, res) => {
    Trader.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    })
      .then(([, [data]]) => (data !== undefined ? res.json(data) : res.sendStatus(404)))
      .catch((e) => {
        if (e.name === 'SequelizeValidationError') {
          res.status(400).json(prettifyErrors(e));
        } else res.sendStatus(500);
      });
  })
// Supprimer un Trader
// TO DO : route accessible que pour les admins
  .delete('/:id', (req, res) => {
    // <==> HttpCode.deleteOne({ _id: req.params.code })
    Trader.destroy({ where: { id: req.params.id } })
      .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
      .catch((e) => res.sendStatus(500));
  });

module.exports = router;
