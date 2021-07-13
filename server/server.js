/* eslint-disable no-console */

const express = require('express');

const app = express();

// app.set('views', `${__dirname}/views`);

app.use(express.json());
app.use(express.urlencoded());

app.post('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/transactions', (req, res) => {
  res.status(201).json(req.body);
});

app.listen(process.env.PORT || 3000, () => console.log('server is listening'));
