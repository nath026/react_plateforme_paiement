/* eslint-disable no-console */

const express = require('express');
const TraderRouter = require("./routes/TraderRouter");
const app = express();
const cors = require("cors");
const ArticleRouter = require("./routes/ArticleRouter");
const OrderRouter = require("./routes/OrderRouter");

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

app.use("/traders", TraderRouter);

app.use("/articles", ArticleRouter);

app.use("/order", OrderRouter);

app.listen(process.env.PORT || 3000, () => console.log('server is listening'));
