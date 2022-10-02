const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const CommentSchema = new Schema({
    comment:{
        type:String
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment