require('dotenv').config()
const { JWT_SECRET } = process.env
const UserModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

const getUser = async (req, res)=>{
    try {
        const user = req.user
        if(!user) throw new Error('missing user info')

        // console.log(req.token)
        return res.status(200).json({user,token:req.token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const confirmAccount = async (req, res)=>{
    try {
//  Recibimos el token por Query y verificamos que exista
        const {token} = req.query
        if(!token) throw new Error('missing token')
        // console.log({token})
//---------------------
//  Decodificamos el token y buscamos el usuario
        const {_id, username, email} = jwt.verify(token, JWT_SECRET)

        const user = await UserModel.findOne({_id})
        if(!user) throw new Error('Invalid user')
//---------------------      
//  Actualizamos el usuario agregandole los datos faltantes
        const updateUser = await UserModel.updateOne({_id}, {$set:{username, email}})
        // console.log({updateUser})
//---------------------
        res.status(200).send('Tu cuenta ya esta creada')
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const deleteAccount = async (req, res)=>{
    try {
        const { _id } = req.user

        const deleteUser = await UserModel.deleteOne({_id})
        // console.log(deleteUser)
        return res.status(200).json({deleteUser})
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

module.exports = {
    getUser,
    confirmAccount,
    deleteAccount,
    modifyUser,
}