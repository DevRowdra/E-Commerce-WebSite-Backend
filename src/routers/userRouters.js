
const express = require('express');
const { getUser } = require('../controllers/userController');
const userRouter=express.Router()

//  GET: /api/user
  userRouter.get('/', getUser);
  
  module.exports=userRouter