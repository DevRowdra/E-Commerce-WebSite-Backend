const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const User = require('../models/userModels');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');
const { findWithId } = require('../services/findItem');
const { deleteImage } = require('../helper/deleteImage');
const { createJsonWebToken } = require('../helper/jsonWebToken');
const { jwtActivationKey, clientUrl } = require('../secret');
const emailWithNodeMailer = require('../helper/email');

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    // this regExp use for user name searching
    const searchRegExp = new RegExp('.*' + search + '.*', 'i');

    // this filter use for show normal user not admin, $ne for not equel
    const filter = {
      isAdmin: { $ne: true },
      // here we filter or search using this regexp on name ,phone, email
      $or: [
        { name: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ],
    };
    // this skip variable user for skip how many item first page to sec page
    const skip = (page - 1) * limit;
    const options = { password: 0 };
    const users = await User.find(filter, options).limit(limit).skip(skip);
    // this count variable use for counting how many user show on one page
    const count = await User.find(filter).countDocuments();
    if (!users) throw createError(404, 'not found any user ');

    return successResponse(res, {
      statusCode: 200,
      message: 'users wer return successfully',
      payload: {
        users,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
// get single user using if
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    // simplyfy this process make another common function for this
    const user = await findWithId(User, id, options);
    return successResponse(res, {
      statusCode: 200,
      message: 'user wer return successfully',
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    // simplyfy this process make another common function for this
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;
    deleteImage(userImagePath);
    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });
    return successResponse(res, {
      statusCode: 200,
      message: 'user were delete successfully',
    });
  } catch (error) {
    next(error);
  }
};
// controller for register user
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(
        409,
        'user with this email already exists ,please sing in '
      );
    }
    // create jwt
    const token = createJsonWebToken(
      { name, email, password, phone, address },
      jwtActivationKey,
      '10m'
    );
    // prepare email
    const emailData = {
      email,
      subject: 'Account Activation Email',
      html: `
  <h1>Hello ${name}!</h1>
  <p>
  please click here to <a href="${clientUrl}/api/users/activate/${token}" target="_blank">activate you email</a>
  </p>
  `,
    };

    // send email
    try {
      await emailWithNodeMailer(emailData);
    } catch (emailError) {
      next(createError(500, 'Failed to send verification Email'));
      return;
    }

    const newUser = {
      name,
      email,
      password,
      phone,
      address,
    };
    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your registration process `,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};



// * this route is use for activate user 
const activateUserAccount = async (req, res, next) => {
  try {
    
const token=req.body.token
console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',token)
if (!token) {
  throw createError(200,'token not found')
}
try {
  // verify jwt 
const decoded=jwt.verify(token,jwtActivationKey)
if (!decoded) {
  throw createError(200,'unable to  verify user')
}
const userExists = await User.exists({ email: decoded.email });
    if (userExists) {
      throw createError(
        409,
        'User with this email already exists ,please sing in '
      );
    }
console.log(decoded)
await User.create(decoded)
    
    return successResponse(res, {
      statusCode: 200,
      message: "user was register successfully",
     
    });
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    throw createError(401,'Token was expired')
  }else if(error.name === 'jsonWebTokenError'){
    throw createError(401,'Invalid Token')

  }
  else{
    throw error;
  }
}
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers, getUserById, deleteUserById, processRegister , activateUserAccount};
