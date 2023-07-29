const createError = require('http-errors');
const User=require('../models/userModels')

  const getUser=async (req, res,next) => {
    try {
      const users= await User.find()
        res.status(200).send({message:'user is working',
        users
  });
    } catch (error) {
        next(error)
    }
  }
  module.exports={getUser}