
const bcrypt = require('bcrypt')
const { generateToken } = require('.')
const UserModel = require('../models/userModel')
const { sendMail } = require('./emailer')
const registerTempate = require('../htmlTemplates/registerTemplate')

const signUp = async (req, res)=>{
    try {
        const { username, email, password } = req.body
        if( !username || !email || !password ) throw new Error('missing data')

//  Hasheamos la contrasenia con bcrypt y creamos el usuario {_id, passwordHash}
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new UserModel({ passwordHash })

        await newUser.save()
//-----------------------------

// Combertimos los datos del usuario en un token junto con su _id y creamos la URL para completar el proseso de registro
        const data = { _id: newUser._id, username, email}
        const token = await generateToken(data, '24h')
        const urlToken = 'https://user-db-back-end.onrender.com' + '/api/user/confirmAccount?token=' + token
//-----------------------------

//  Enviamos un email con un boton con la ruta 'urlToken' para verificar que no es falso
        const info = {
            from:'cosme.pruevalito@gmail.com',
            to:email,
            subject:'Register Page',
            html:registerTempate(urlToken)
        }
        await sendMail(info)
//-----------------------------

        return res.status(200).json({message:'Se a enviado un mail para confirmar su cuenta.'})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const signIn = async (req, res)=>{
    try {
        const { email, password } = req.body
        // console.log({ email, password })
        if(!email || !password) throw new Error('important data is missing')
        const {_id, username} = await UserModel.findOne({email})

        // console.log({email, password, _id})
        const data = { _id, username, email }
        const token = await generateToken(data, '4h')

        return res.status(200).json({token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const confirmToken = async (req, res)=>{
    try {
        // Agregar un middeware que actualize el token si se hizo una peticion 1h antes de que se vensa el token actual
        const token = req.headers['authorization']?.split(' ').at(1)

        return res.status(200).json({token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    signUp,
    signIn,
    confirmToken,
}