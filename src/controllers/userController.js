const createError = require('http-errors');
const User = require('../models/userModels');

const getUser = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    // this regExp use for user name searching
    const searchRegExp =new RegExp('.*'+ search +'.*', 'i');

    // this filter use for show normal user not admin, $ne for not equel 
    const filter = {
      isAdmin: { $ne: true },
      // here we filter or search using this regexp on name ,phone, email
      $or:[
        {name:{$regex:searchRegExp}},
        {phone:{$regex:searchRegExp}},
        {email:{$regex:searchRegExp}},
      ]
    };
    // this skip variable user for skip how many item first page to sec page
    const skip= (page-1) * limit
    const options={password:0}
    const users = await User.find(filter,options).limit(limit).skip(skip)
    
    res.status(200).send({ message: 'user is working', users });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUser };
