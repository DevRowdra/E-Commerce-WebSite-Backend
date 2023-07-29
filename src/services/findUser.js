const createHttpError = require("http-errors");
const User = require("../models/userModels");
const { default: mongoose } = require("mongoose");

const findUserById=async(id)=>{
   try {
    const options = { password: 0 };
    const user = await User.findById(id, options)
   
  
    if (!user) {throw createHttpError(404, 'user dose not found with this email ')};
    return user
   } catch (error) {
    if(error instanceof mongoose.Error){
        throw createError(400,'Invalid User id')
      }
      throw error
   }
}
module.exports={findUserById}