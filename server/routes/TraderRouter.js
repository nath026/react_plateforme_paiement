/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prettifyErrors } = require('../lib/utils');
const { Trader } = require('../models/sequelize');
const { createJWT } = require('../lib/security');
require('dotenv').config();

const router = Router();

// TODO : mettre les try catch token pour les fonctions
router
// Affichage de tous les traders
  .get('/', (req, res) => {
    const { page = 1, perPage = 10, ...query } = req.query;
    Trader.findAll({
      where: query,
      // attributes: ["firstname", "confirmed"],
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      paranoid: false,
    })
      .then((data) => res.json(data))
      .catch((e) => res.sendStatus(500));
  })
// Inscription d'un trader
  .post('/', (req, res) => {
    new Trader(req.body)
      .save()
      .then((data) => res.status(201).json(data, "TRADER ENREGISTRÉ !"))
      .catch((e) => {
        if (e.name === 'SequelizeValidationError') {
          res.status(400).json(prettifyErrors(e));
        } else {
          res.status(500).json('Error system');
          console.error(e);
        }
      });
  })
  // Se login en tant que Trader
  .post('/login', async (req, res) => {
    const { username, password, role } = req.body;
    const trader = await Trader.findOne({ where: { username } });
    if (!trader) res.json({ error: "User n'existe pas" });
    try {
      const passwordValid = await bcryptjs.compare(password, trader.password);
      if (!passwordValid) {
        res.status(500).json({ error: 'Mauvaise combinaison entre mdp et username' });
      }
      // TODO : changer salut par ENV
      const token = jwt.sign({ traderId: trader.id }, 'salut');
      res.status(200).json({ token });
    } catch (e) {
      res.sendStatus(500).json('error impossible de se co');
      console.log(e);
    }
  })

  // test
  .post('/test', async (req, res) => {
    // const decoded = jwt.verify(req.body.token, 'salut');
    try {
      const decoded = jwt.verify(req.body.token, 'salut');
      // decoded.traderId;
      res.json(decoded.traderId);
    } catch (err) {
      console.log(err);
    }
    console.log(decoded.foo); // bar
    console.log(req.body);
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
    try {
      const decoded = jwt.verify(req.body.token, 'salut');
      const idTrader = decoded.traderId;
      if (idTrader == req.params.id) {
        res.json('GOOD POUR METTRE A JOUR USER');
      } else {
        res.json("VOUS n'êtes pas autoriésé à modif cet user");
      }
    } catch (e) {
      res.status(500).json({
        error: "VOUS n'êtes pas autoriésé à modif cet user",
      });
    }
    // Trader.update(req.body, {
    //   where: { id: req.params.id },
    //   returning: true,
    //   individualHooks: true,
    // })
    //   .then(([, [data]]) => (data !== undefined ? res.json(data) : res.sendStatus(404)))
    //   .catch((e) => {
    //     if (e.name === 'SequelizeValidationError') {
    //       res.status(400).json(prettifyErrors(e));
    //     } else res.sendStatus(500);
    //   });
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
