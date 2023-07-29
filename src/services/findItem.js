const createHttpError = require("http-errors");
const User = require("../models/userModels");
const { default: mongoose } = require("mongoose");

const findWithId=async(id,options={})=>{
   try {
    const item = await User.findById(id, options)
   
  
    if (!item) {throw createHttpError(404, 'item dose not found with this email ')};
    return item
   } catch (error) {
    if(error instanceof mongoose.Error){
        throw createError(400,'Invalid item id')
      }
      throw error
   }
}
module.exports={findWithId}