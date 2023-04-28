const express = require('express')
const { verifyUser, verifyToken, updateToken, checkDuplicateEmail } = require('../middlewares')
const { signUp, signIn, confirmToken } = require('../controllers/auth')

const router = express.Router()

router.post('/register', checkDuplicateEmail, signUp)

router.post('/login', verifyUser, signIn)

router.get('/confirmToken', verifyToken, updateToken, confirmToken)

    // const { email, password } = req.body
    // if(!email || !password) throw new Error('important data is missing')
    // const user = await UserModel.findOne({email})
    // const match = !!user && await bcrypt.compare(password, user.passwordHash)
    // if(!match) throw new Error('Invalid email or password')

    // const { _id, username, email } = req.user
    // console.log({ _id, username, email })
    // const token = jwt.sign(
    //     {_id: user._id, username: user.username, email: user.email},
    //     JWT_SECRET || 'shhhhh',
    //     { expiresIn: '2h'}
    // )


module.exports = router;