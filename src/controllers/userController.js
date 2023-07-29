const createError = require('http-errors');
const User = require('../models/userModels');
const { successResponse } = require('./responseController');

const getUser = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;
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

    
    return successResponse(res,{statusCode:200,
    message:"user wer return successfully",
    payload:{
      users,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 > Math.ceil(count / limit) ? page + 1 : null,
      },
    }
    })
  } catch (error) {
    next(error);
  }
};
module.exports = { getUser };
