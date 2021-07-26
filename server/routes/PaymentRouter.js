const { Router } = require("express");
const { prettifyErrors } = require("../lib/utils");
const { Tag } = require("../models/sequelize");

const router = Router();

router
  .get("/", (req, res) => {
    res.render("payment", {
      items: [{ title: "spoon", quantity: "1" }],
    });
  })
  .post("/", (req, res) => {
    console.log(req.body);
    res.render("payment", {
      success: true,
      items: [{ title: "spoon", quantity: "1" }],
    });
  });

module.exports = router;
