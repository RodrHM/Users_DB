
const bcrypt = require('bcrypt')
const { generateToken } = require('.')
const UserModel = require('../models/userModel')
const { sendMail } = require('./emailer')
const registerTempate = require('../htmlTemplates/registerTemplate')
const forgotPasswordTemplate = require('../htmlTemplates/forgotPasswordTemplate')


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
        const data = { _id: newUser._id, username, email, moduleCase:'confirmAccount'}
        const token = await generateToken(data, '24h')
        const route = `/verification-module?case=confirmAccount&&token=${token}`
        // const urlToken = 'https://user-db-back-end.onrender.com' + '/api/user/confirmAccount?token=' + token
        // const urlToken = 'https://users-db-six.vercel.app' + route
        const urlToken = 'http://localhost:3000' + route
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

        if(!email || !password) throw new Error('important data is missing')
        const {_id, username} = await UserModel.findOne({email})

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
        if (!req.headers.authorization) throw new Error('missing req.headers.authorization')
        const token = req.headers['authorization'].split(' ')[1]

        return res.status(200).json({token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const tokenModifyPassword = async (req, res)=>{
    try {
        const {moduleCase} = req.body
        const {_id, email} = req.user
        const token = req.token
        if(!moduleCase) throw new Error('missing moduleCase')
        if(moduleCase!=='changePassword') throw new Error('Not func')

        const tokenModPass = await generateToken({_id, email, moduleCase}, '1h')

        const route = `/verification-module?case=${moduleCase}&&token=${tokenModPass}`
        
        return res.status(200).json({token, url:route})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const tokenRecoverPassword = async (req, res)=>{
    try {
        const {email, moduleCase} = req.body
        if(!moduleCase) throw new Error('missing moduleCase')
        if(moduleCase!=='forgotPassword') throw new Error('Not func')
        if(!email) throw new Error('missing email')

        const {_id} = await UserModel.findOne({email})
        if(!_id) throw new Error('invalid email')

        const tokenModPass = await generateToken({_id, email, moduleCase}, '1h')
        const route = `/verification-module?case=${moduleCase}&&token=${tokenModPass}`
        // const urlToken = 'https://users-db-six.vercel.app' + route
        const urlToken = 'http://localhost:3000' + route

        const info = {
            from:'cosme.pruevalito@gmail.com',
            to:email,
            subject:'Recuperar Contraseña',
            html:forgotPasswordTemplate(urlToken)
        }
        await sendMail(info)
        //  https://user-db-back-end.onrender.com
        return res.status(200).json({message:'Se a enviado un mail para cambiar su contraseña.'})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const tokenDesactiveAccount = async (req, res)=>{
    try {
        const {_id, email} = req.user

        const tokenModPass = await generateToken({_id, email, moduleCase:'desactiveAccount'}, '1h')

        const route = `/verification-module?case=desactiveAccount&&token=${tokenModPass}`
        
        return res.status(200).json({url:route})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    signUp,
    signIn,
    confirmToken,
    tokenModifyPassword,
    tokenRecoverPassword,
    tokenDesactiveAccount,
}