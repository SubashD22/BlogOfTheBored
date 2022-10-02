const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true, "Please add a Username"],
        unique: true
    },
    email: {
        type: String,
        required:[true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required:[true, "Please add a Username"],
    },
    profilePic:{
        type:String,
        required:true,
        default:"https://i.pinimg.com/originals/29/1c/ab/291cabe685fb6dbbd1139dde967499b4.jpg"
    },
},{timestamps:true})

const User = mongoose.model('User',userSchema)
module.exports = User