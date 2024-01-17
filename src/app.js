const express = require('express');
const authRouter = require('./routes/auth');
const resObj = require('./utils/resObj');

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.all('*', (req, res) => {
  let msg = `#! Can't find ${req.originalUrl} on this server!`;
  resObj.fail(res, 404, msg);
});

module.exports = app;
