const {model, Schema} = require('mongoose');

const postSchema = new Schema({
    body:String, 
    usernmae:String,
    createdAt:String,
    //we can make an array of objs
    comments:[
        {
            body:String,
            username:String,
            createdAt:String
        }
    ],
    likes:{
        username:String,
        createdAt:String
    }
})