require('dotenv').config()
const {JWT_SECRET} = process.env
const jwt = require("jsonwebtoken")


const generateToken = async (data, time)=>{
    if(!data) throw new Error('')
    if(!time) throw new Error('')
    const token = jwt.sign(data, JWT_SECRET, {expiresIn: time})
    return token
}

module.exports = {
    generateToken
}