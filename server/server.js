const express = require('express');
const UserRouter = require('./routes/UserRouter');

const app = express();

app.use(express.json());

app.use('/users', UserRouter);

app.listen(process.env.PORT || 3000, () => console.log('server is listening'));
