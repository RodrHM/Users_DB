const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:false
    },
    email:{
        type: String,
        required:false,
        
        // unique: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel;
