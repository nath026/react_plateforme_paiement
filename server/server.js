/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');
const TraderRouter = require('./routes/TraderRouter');

const app = express();

// app.set('views', `${__dirname}/views`);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/transactions', (req, res) => {
  res.status(201).json(req.body);
});

app.use('/traders', TraderRouter);

app.listen(process.env.PORT || 3000, () => console.log('server is listening'));
