//import mongoose
const mongoose=require('mongoose')

//define connection string with Mongodb and server
mongoose.connect('mongodb://localhost:27017/remainder',{useNewUrlParser:true})

//creat a model to perform operations your server and mongodb
const User = mongoose.model('User',{
    userId:Number,
    username:String,
    password:String,
    event:[]
})

module.exports={
    User
}