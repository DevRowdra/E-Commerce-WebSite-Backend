require("dotenv").config();
const serverPort=process.env.SERVER_PORT || 3002
const mongodbUrl=process.env.MONGODB_ATLAS_DATABASE || "mongodb://localhost:27017/e-commerceDB2023 "

const defaultImagePath=process.env.DEAFULTIMAGEPATH || '../public/images/users/profile pic.jpg'

module.exports={ serverPort,mongodbUrl,defaultImagePath}