var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    gem: [{type: Schema.Types.ObjectId, ref: 'Gem'}]
})

module.exports = mongoose.model('User', userSchema)