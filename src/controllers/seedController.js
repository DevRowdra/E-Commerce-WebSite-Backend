const data = require('../data')
const User=require('../models/userModels')
const seedUser=async(req,res,next)=>{
    try {
        // delete all user
        await User.deleteMany({})
        // inserting new user
        const users= await User.insertMany(data.users)
        // success fully add
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}
module.exports={seedUser}