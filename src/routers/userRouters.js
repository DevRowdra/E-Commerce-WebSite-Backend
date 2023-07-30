
const express = require('express');
const { getUsers, getUserById, deleteUserById } = require('../controllers/userController');
const userRouter=express.Router()

//  GET: /api/user
  userRouter.get('/', getUsers);
  // get single user api
  userRouter.get('/:id', getUserById);
  // delete user api
  userRouter.delete('/:id', deleteUserById);
  
  module.exports=userRouter