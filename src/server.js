const app = require("./app")
const {serverPort}=require('./secret')
console.log(serverPort)
app.listen(serverPort,()=>{
    console.log(`server is running in port http://localhost:${serverPort}/`)
})