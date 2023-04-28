const { Router } = require('express');
const AuthRoutes = require('./AuthRoute')
const UserRoutes = require('./UserRoute')


const router = Router();

router.use('/auth', AuthRoutes)    //  Rutas de la carpeta
router.use('/user', UserRoutes)

module.exports = router;
