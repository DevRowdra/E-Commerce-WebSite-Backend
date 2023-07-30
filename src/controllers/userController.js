const createError = require('http-errors');
const fs = require('fs').promises;
const User = require('../models/userModels');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');
const { findWithId } = require('../services/findItem');

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
    fs.access(userImagePath)
    .then(() =>  fs.unlink(userImagePath))
    .then(() => console.error('user image were deleted'))
    .catch((err) => console.error('user image dose not exist'));
   
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
module.exports = { getUsers, getUserById, deleteUserById };
