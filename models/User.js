//lets start making our db models
//mongo is schemaless, but we can specify a schema to have more safety when working with server code

const {model, Schema} = require('mongoose')
const userSchema = new Schema({
    //unique name to each user
    username:String,
    password:String,
    email:String,
    createdAt:String
})

module.exports = model('User', userSchema)