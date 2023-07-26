const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isLogging = (req, res, next) => {
  const user = true;
  if (user) {
    req.body.id = 1001;
    console.log('all ok');
    next();
  } else {
    console.log('not working');
    return res.status(401).json({ message: 'not working' });
  }
};
app.get('/live', (req, res) => {
  res.send('live is ond');
});
app.get('/api/user', isLogging, (req, res) => {
  console.log(req.body.id);
  res.send('live is ond');
});




//! client error handling
app.use((req, res, next) => {
  // res.status(404).json({message:'nothing found in this route'})

  next(createError(404, 'nothing found in this route'));
});




//! server error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res
    .status(err.status || 500)
    .json({ message: err.message, success: false });
});
module.exports = app;
