const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{type: String, required: true, Unique: true},
    password:{type: String, required: true},
    name: {type: String},

})

module.exports = mongoose.model('user', userSchema)