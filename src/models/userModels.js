const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { defaultImagePath } = require('../secret');
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      minlength: [
        3,
        'The length of  user name can be minlength must be in 3 character',
      ],
      maxlength: [
        36,
        'The length of  user name can be maxlength must be in 37 character',
      ],
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'please enter a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'User password is required'],
      trim: true,
      minlength: [
        6,
        'The length of  user password can be minlength must be in 3 character',
      ],
      set: (p) => bcrypt.hashSync(p, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: defaultImagePath,
    },
    address: {
      type: String,
      required: [true, 'User address is required'],
    },
    phone: {
      type: String,
      required: [true, 'User phone is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBan: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = model('Users', userSchema);
module.exports=User;