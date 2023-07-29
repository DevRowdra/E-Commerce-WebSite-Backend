const mongoose = require('mongoose');
const { mongodbUrl } = require('../secret');
const connectDb=async (option={})=>{
    try {
        await mongoose.connect(mongodbUrl,option)
        .then(() => console.log('Mongodb Connected!'));
        mongoose.connection.on('error',(error)=>{
            console.error('Db connection Error',error)
        })
    } catch (error) {
        console.error('could not Db connection Error',error.toString())
    }
}
module.exports=connectDb;