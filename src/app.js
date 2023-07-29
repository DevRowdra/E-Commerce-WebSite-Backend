const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouters');
const { seedUser } = require('./controllers/seedController');
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseController');
const rateLimiters=rateLimit({
  windowMs:1*6*1000, //1 minuts
  max:5,
  message:'to many request on this router try again letter'
})
app.use(rateLimiters)
app.use(xssClean())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userRouter)
app.use("/api/seed",seedRouter)
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
  res.status(200).send({message:'live is working'});
});


//! client error handling
app.use((req, res, next) => {
  // res.status(404).json({message:'nothing found in this route'})

  next(createError(404, 'nothing found in this route'));
});




//! server error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
 return errorResponse(res,{statusCode:err.status, message:err.message})
});
module.exports = app;
