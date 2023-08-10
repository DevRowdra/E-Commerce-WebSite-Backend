const jwt = require('jsonwebtoken');
const createJsonWebToken=(payload,secretKey,expiresIn,)=>{
    if (typeof  payload !== 'object' || !payload) {
        throw new Error ('payload must be an nun-empty object')
    }
    if (typeof  secretKey !== 'string' || secretKey === '') {
        throw new Error ('SecretKey must be an nun-empty string')
    }
try {
    const token = jwt.sign(payload, secretKey,{expiresIn});
return token;
} catch (error) {
    console.error('fail to sing in the Jwt:',error)
    throw error;
}
}
module.exports={createJsonWebToken}