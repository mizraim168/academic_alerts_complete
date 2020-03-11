const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema({
    // email: {type: String, required: true},
    // password: {type: String, required:true}

    name: {type: String, required: true},
    lastname: {type: String, required: true},
    motherlastname: {type: String, required: true},
    password: {type: String, required:true},
    confirm_password: {type: String, required:true},
    role: {type: String, required: true},
    highdate: {type: Date,  default: Date.now}
});


module.exports = mongoose.model('Users', users);

