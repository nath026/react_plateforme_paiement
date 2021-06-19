/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const { Router } = require('express');
const { prettifyErrors } = require('../lib/utils');
const { Article, User } = require('../models/sequelize');

const router = Router();

router
  .get('/', (req, res) => {
    const { page = 1, perPage = 10, ...query } = req.query;
    User.findAll({
      where: query,
      // attributes: ["firstname", "confirmed"],
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      paranoid: false,
      include: [{ model: Article, as: 'myArticles' }],
    })
      .then((data) => res.json(data))
      .catch((e) => res.sendStatus(500));
  })
  .post('/', (req, res) => {
    new User(req.body)
      .save()
      .then((data) => res.status(201).json(data))
      .catch((e) => {
        if (e.name === 'SequelizeValidationError') {
          res.status(400).json(prettifyErrors(e));
        } else console.error(e) || res.sendStatus(500);
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
      .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
      .catch((e) => res.sendStatus(500));
  })
  .put('/:id', (req, res) => {
    User.update(req.body, {
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
  .delete('/:id', (req, res) => {
    // <==> HttpCode.deleteOne({ _id: req.params.code })
    User.destroy({ where: { id: req.params.id } })
      .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
      .catch((e) => res.sendStatus(500));
  });

module.exports = router;
