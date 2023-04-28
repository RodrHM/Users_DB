const express = require('express');
const { verifyToken, updateToken } = require('../middlewares');
const { getUser, confirmAccount, deleteAccount, modifyUser } = require('../controllers/user');

const router = express.Router()

router.get('/', verifyToken, updateToken, getUser)

router.get('/confirmAccount', confirmAccount)

router.put('/modifyAccount', verifyToken, updateToken, modifyUser)

router.delete('/deleteAccount',verifyToken, deleteAccount)

module.exports = router;