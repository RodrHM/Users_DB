require('dotenv').config();
const app = require('./src/app');
require('./src/db');

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Server is listening at Port ${PORT}`)
});
