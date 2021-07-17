/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');
const UserRouter = require('./routes/UserRouter');
const TraderRouter = require('./routes/TraderRouter');
const { authRole } = require('./middleware/verifyAuthorization');
require('dotenv').config();

const app = express();
const ArticleRouter = require('./routes/ArticleRouter');

// app.set('views', `${__dirname}/views`);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/', (req, res) => {
  res.sendStatus(200);
});
// test permission role admin
app.get('/admin/test', authRole(['ADMIN']), async (req, res) => {
  res.json({ message: 'hello admin' });
});
// test permission admin and user
app.get('/user/hello', authRole(['BASIC', 'ADMIN']), async (req, res) => {
  res.json({ message: "you're log" });
});
app.get('/home', async (req, res) => {
  res.json({ message: 'everyone can see' });
});

app.post('/transactions', (req, res) => {
  res.status(201).json(req.body);
});

app.use('/traders', TraderRouter);
app.use('/user', UserRouter);
app.use('/articles', ArticleRouter);

app.listen(process.env.PORT || 3000, () => console.log('server is listening'));
