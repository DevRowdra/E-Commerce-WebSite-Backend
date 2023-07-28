const app = require("./app")
const connectDb = require("./config/db")
const {serverPort}=require('./secret')
console.log(serverPort)
app.listen(serverPort,async()=>{
    console.log(`server is running in port http://localhost:${serverPort}/`)
    await connectDb()
})