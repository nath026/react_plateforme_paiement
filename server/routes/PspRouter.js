/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors()); // Use this after the variable declaration

router.post('/psp', (req, res) => {
  res.sendStatus(202);
  setTimeout(() => {
    fetch(`${process.env.API_URL}/webhook`, { method: 'POST', body: "message='payment is accepted'" })
      .then((response) => response.json()) // expecting a json response
      .then((json) => console.log(json));
  }, 10000);
});

app.listen(3000, () => console.log('psp is listening'));
