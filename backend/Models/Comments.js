const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema(
    {   
        postId: String,
        comment: String,
        author:{
            type:schema.Types.ObjectId,
            ref:'User'
        }
    },{timestamps:true}
);

module.exports = mongoose.model('Comment',commentSchema)