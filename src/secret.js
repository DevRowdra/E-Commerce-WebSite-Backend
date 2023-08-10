require("dotenv").config();
const serverPort=process.env.SERVER_PORT || 3002
const mongodbUrl=process.env.MONGODB_ATLAS_DATABASE || "mongodb://localhost:27017/e-commerceDB2023 "

const defaultImagePath=process.env.DEAFULTIMAGEPATH || '../public/images/users/profile pic.jpg'
const jwtActivationKey=process.env.JWT_ACTIVATION_KEY || 'jlsdolk34hoou24blfl'
const smtpUserName=process.env.SMTP_USERNAME || ''
const smtpPassword=process.env.SMTP_PASSWORD || ''
const clientUrl=process.env.CLIENT_URL || ''
module.exports={ serverPort,mongodbUrl,defaultImagePath,jwtActivationKey,smtpPassword,smtpUserName ,clientUrl}