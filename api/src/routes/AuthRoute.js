const express = require('express')
const { verifyUser, verifyToken, updateToken, checkDuplicateEmail } = require('../middlewares')
const { signUp, signIn, confirmToken, tokenModifyPassword, tokenRecoverPassword, tokenDesactiveAccount } = require('../controllers/auth')

const router = express.Router()

router.post('/register', checkDuplicateEmail, signUp)

router.post('/login', verifyUser, signIn)

router.get('/confirmToken', verifyToken, updateToken, confirmToken)

router.post('/changePassword', verifyToken, updateToken, tokenModifyPassword)

router.post('/forgotPassword', tokenRecoverPassword)

router.post('/desactiveAccount', verifyToken, tokenDesactiveAccount)

module.exports = router;