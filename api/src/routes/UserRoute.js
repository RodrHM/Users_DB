const express = require('express');
const { verifyToken, updateToken } = require('../middlewares');
const { getUser, confirmAccount, desactiveAccount, modifyUser, modifyPassword } = require('../controllers/user');

const router = express.Router()

router.get('/', verifyToken, updateToken, getUser)

router.get('/confirmAccount', confirmAccount)

router.put('/modifyAccount', verifyToken, updateToken, modifyUser)

router.put('/changePassword', verifyToken, modifyPassword)

router.delete('/desactiveAccount',verifyToken, desactiveAccount)

module.exports = router;