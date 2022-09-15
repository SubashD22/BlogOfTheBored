const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const UserSchema = new Schema ({
        name: {
            type: String,
            required:[true, "Please add a name"]
        },
        userName: {
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
        },
        about: String
});

const User = mongoose.model('User',UserSchema);

module.exports=User