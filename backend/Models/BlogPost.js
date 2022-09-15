const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BlogPostSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    banner:{
        type: String,
        required: true
    },
    subTitles:[
        {   
            image: String,
            subTitle: String,
            content: {
                type:String,
                required: true
            }
        }
    ],
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    timestamps: true
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema );

module.exports = BlogPost