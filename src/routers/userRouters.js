
const express = require('express');
const { getUsers, getUser, deleteUser } = require('../controllers/userController');
const userRouter=express.Router()

//  GET: /api/user
  userRouter.get('/', getUsers);
  // get single user api
  userRouter.get('/:id', getUser);
  // delete user api
  userRouter.delete('/:id', deleteUser);
  
  module.exports=userRouter