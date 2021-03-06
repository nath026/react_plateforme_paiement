// const { Router } = require("express");
// const { prettifyErrors } = require("../lib/utils");
// const { Trader, Article } = require("../models/sequelize");
// const jwt = require('jsonwebtoken');
// const router = Router();

// router
//   .get("/", (req, res) => {
//     const {
//       // author = {},
//       page = 1,
//       perPage = 10,
//       ...query
//     } = req.query;
//     Article.findAll({
//       where: query,
//       //attributes: ["firstname", "confirmed"],
//       limit: parseInt(perPage),
//       offset: (parseInt(page) - 1) * parseInt(perPage),
//       paranoid: false,
//       // include: [
//       //   { model: Trader, as: "author", where: author },
//       // ],
//     })
//       .then((data) => res.json(data))
//       .catch((e) => res.sendStatus(500));
//   })
//   .post("/", (req, res) => {
//     let decoded;
//     try{
//      decoded = jwt.verify(req.body.token, 'salut');
      
//     } catch(e) {
//       res.json({
//         error: "impossible de crééer un article , token invalide" 
//       })
//       return;
//     }
//     const idTrader = decoded.traderId;
//     new Article({traderId: idTrader, ...req.body})
//       .save()
//       .then((data) => res.status(201).json(data, "Article enregistré !"))
//       .catch((e) => {
//         if (e.name === "SequelizeValidationError") {
//           res.status(400).json(prettifyErrors(e));
//         } 
//         else {
//           console.log(e);
//           res.json({
//           error: "erreur dans la sauvegarde" });}
//       });
      
//   })
//   .get("/:id", (req, res) => {
//     const { id } = req.params;
//     Article.findByPk(id)
//       .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
//       .catch((e) => res.sendStatus(500));
//   })
//   .put("/:id", (req, res) => {
//     Article.update(req.body, {
//       where: { id: parseInt(req.params.id) },
//       returning: true,
//       include: [Tag],
//     })
//       .then((result) => {
//         console.log(result);
//         const [, [data]] = result;
//         data !== undefined ? res.json(data) : res.sendStatus(404);
//       })
//       .catch((e) => {
//         console.error(e);
//         if (e.name === "SequelizeValidationError") {
//           res.status(400).json(prettifyErrors(e));
//         } else res.sendStatus(500);
//       });
//   })
//   .delete("/:id", (req, res) => {
//     // <==> HttpCode.deleteOne({ _id: req.params.code })
//     Article.destroy({ where: { id: req.params.id } })
//       .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
//       .catch((e) => res.sendStatus(500));
//   });

// module.exports = router;

const { Router } = require("express");
const { prettifyErrors } = require("../lib/utils");
const { User, Tag, Article } = require("../models/sequelize");
const router = Router();

router
  .get("/", (req, res) => {
    const {
      tag = {},
      author = {},
      page = 1,
      perPage = 10,
      ...query
    } = req.query;
    Article.findAll({
      where: query,
      //attributes: ["firstname", "confirmed"],
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      paranoid: false,
      include: [
        { model: User, as: "author", where: author },
        { model: Tag, as: "tags", where: tag },
      ],
    })
      .then((data) => res.json(data))
      .catch((e) => res.sendStatus(500));
  })
  .post("/", (req, res) => {
    new Article(req.body)
      .save()
      .then((data) => res.status(201).json(data))
      .catch((e) => {
        if (e.name === "SequelizeValidationError") {
          res.status(400).json(prettifyErrors(e));
        } else res.sendStatus(500);
      });
  })
  .get("/:id", (req, res) => {
    const { id } = req.params;
    Article.findByPk(id)
      .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
      .catch((e) => res.sendStatus(500));
  })
  .put("/:id", (req, res) => {
    Article.update(req.body, {
      where: { id: parseInt(req.params.id) },
      returning: true,
      include: [Tag],
    })
      .then((result) => {
        console.log(result);
        const [, [data]] = result;
        data !== undefined ? res.json(data) : res.sendStatus(404);
      })
      .catch((e) => {
        console.error(e);
        if (e.name === "SequelizeValidationError") {
          res.status(400).json(prettifyErrors(e));
        } else res.sendStatus(500);
      });
  })
  .delete("/:id", (req, res) => {
    // <==> HttpCode.deleteOne({ _id: req.params.code })
    Article.destroy({ where: { id: req.params.id } })
      .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
      .catch((e) => res.sendStatus(500));
  });

module.exports = router;

