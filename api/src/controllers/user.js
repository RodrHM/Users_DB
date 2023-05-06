require('dotenv').config()
const { JWT_SECRET } = process.env
const UserModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getUser = async (req, res)=>{
    try {
        const user = req.user
        if(!user) throw new Error('missing user info')

        return res.status(200).json({user,token:req.token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const confirmAccount = async (req, res)=>{
    try {
//  Recibimos el token por Headers y verificamos que exista
        if (!req.headers.authorization) throw new Error('missing req.headers.authorization')
        const token = req.headers['authorization'].split(' ')[1]
        // const {token} = req.query
        if(!token) throw new Error('missing token')
//---------------------
//  Decodificamos el token, validamos el asunto y buscamos el usuario
        const {_id, username, email, moduleCase} = jwt.verify(token, JWT_SECRET)

        if(moduleCase!=='confirmAccount') throw new Error('Invalid Subject')
        const user = await UserModel.findOne({_id})
        if(!user) throw new Error('Invalid user')
//---------------------      
//  Actualizamos el usuario agregandole los datos faltantes
        await UserModel.updateOne({_id}, {$set:{username, email}})
//---------------------
        res.status(200).json({message:'Tu cuenta ya esta creada'})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const desactiveAccount = async (req, res)=>{
    try {
        const { _id } = req.user
        const moduleCase = req.moduleCase
        
        if(!moduleCase) throw new Error('missing moduleCase')
        if(moduleCase!=='desactiveAccount') throw new Error('Not func')

        await UserModel.deleteOne({_id})
        return res.status(200).json({message:'Su cuenta a sido eliminada.'})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const modifyUser = async (req, res)=>{
    try {
        const {username, email} = req.body
        if(!username) throw new Error('missing info')

        let update = {$set:{}}
        if(username) update.$set.username = username

        await UserModel.updateOne({email}, update)
        const user = await UserModel.findOne({email}, {passwordHash:0})
        return res.status(200).json({token:req.token, user})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const modifyPassword = async (req, res)=>{
    try {
        const {password, newPassword} = req.body
        const {email} = req.user
        const moduleCase = req.moduleCase

        if(moduleCase==='changePassword') {
            if(!password || !newPassword) throw new Error('missing password or newPassword')

            const user = await UserModel.findOne({email})
            const checkUser = !!user && await bcrypt.compare(password, user.passwordHash)

            if(!checkUser) throw new Error('invalid password')
        }
        if(moduleCase==='forgotPassword' && !newPassword) throw new Error('missing newPassword')
        
        const salt = await bcrypt.genSalt(10)
        const newPasswordHash = await bcrypt.hash(newPassword, salt)
        const update = {$set:{passwordHash:newPasswordHash}}
        await UserModel.updateOne({email}, update)

        return res.status(200).json({message:'Tu contraseña a sido cambiada'})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getUser,
    confirmAccount,
    desactiveAccount,
    modifyUser,
    modifyPassword,
}