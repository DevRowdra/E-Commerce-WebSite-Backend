
const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount } = require('../controllers/userController');
const userRouter=express.Router()

//  GET: /api/user
  userRouter.get('/', getUsers);
  // get single user api
  userRouter.get('/:id', getUserById);
  // delete user api
  userRouter.delete('/:id', deleteUserById);
  // register new user route
  userRouter.post('/process-register', processRegister);
  // verify user account 
  userRouter.post('/verify', activateUserAccount)
  module.exports=userRouter