const createError = require('http-errors');
const users = require('../models/userModels');


  const getUser= (req, res,next) => {
    try {
        res.status(200).send({message:'user is working',
    users:users});
    } catch (error) {
        next(error)
    }
  }
  module.exports={getUser}