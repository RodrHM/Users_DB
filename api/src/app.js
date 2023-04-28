const express = require('express')
const morgan = require('morgan')
const pkg = require('../package.json');
const routes = require('./routes/index')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.set('pkg', pkg);
app.use(cors({origin: "*"}));
app.use(express.json({ limit: '50mb'}))
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    return res.status(200).json({
      author: app.get('pkg').author,
      description: app.get('pkg').description,
      version: app.get('pkg').version
    });
});
app.use('/api', routes)   //  Rutas de index

module.exports = app;
