require('dotenv').config()
const { JWT_SECRET } = process.env
const { generateToken } = require('../controllers')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')

async function verifyToken (req, res, next){
    try {
        if (!req.headers.authorization) return res.status(403).json({error: 'missing token'})
        const token = req.headers['authorization'].split(' ')[1] // authorization
        if(!token) return res.status(403).json({error: 'No token provided'})
        const {_id, moduleCase} = jwt.verify(token, JWT_SECRET)
        const user = await UserModel.findById(_id, {passwordHash: 0});
        if (!user) return res.status(404).json({error: `User was not found in the database`});
        //  moduleCase es un valor especial para el token para aespecificar su tipo de uso
        if(moduleCase) req.moduleCase = moduleCase
        req.user = user
        return next();
    } catch (error) {
        return res.status(400).json({error:'the token was invalid or unauthorized'})
    }
}

async function updateToken (req, res, next){
    try {
        if (!req.headers.authorization) throw new Error('missing req.headers.authorization')
        const token = req.headers['authorization'].split(' ')[1]
        if(!token) return res.status(403).json({error: 'No token provided'})
        const { iat, exp, _id, username, email } = jwt.verify(token, JWT_SECRET)
        const newDate = +(Date.now()/1000).toFixed(0)

        const range = (exp-iat)/2
        const minRange = range + iat;
        const maxRange = exp;

        req.token = token
        if(newDate>minRange && newDate<maxRange) req.token = await generateToken({_id, username, email}, '4h')

        return next();
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

async function checkDuplicateEmail (req, res, next){
    try {
        const { email } = req.body

        const findEmail = await UserModel.findOne({ email })
        if(findEmail) throw new Error('The email is taked')
        
        next();
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

async function checkDuplicateUsername (req, res, next){
    try {
        const { username } = req.body

        const findUser = await UserModel.findOne({ username })
        if(findUser) throw new Error('The username is taked')

        next();
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

async function verifyUser (req, res, next){
    try {
        const { email, password } = req.body
        if(!email || !password){
            return res.status(400).json({error:'important data is missing'})
        }

        const user = await UserModel.findOne({email})
        const checkUser = !!user && await bcrypt.compare(password, user.passwordHash)
        if(!checkUser) {
            return res.status(422).json({error:'Invalid email or password'})
            // throw new Error('Invalid email or password')
        }
        
        next();
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    verifyToken,
    checkDuplicateEmail,
    checkDuplicateUsername,
    verifyUser,
    updateToken,
}
