var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({         // define collection attribute in MongoDB
    name: String,
    email: String,
    phone: String,
    password: String
})

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;