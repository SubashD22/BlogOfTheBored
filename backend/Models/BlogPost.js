const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SubText = require('./SubText')


const BlogPost = new Schema (
    {
        title: {
            type:String,
            required:true
        },
        image: String,
        text: {
            type:String,
        },
        subtext:[
            {
                type: Schema.Types.ObjectId,
                ref:'Subtext'
            }
        ],
        author:{
            type: Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        comments:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },{timestamps:true}
);

BlogPost.post('findOneAndDelete', async function(doc){
   if(doc){
    await SubText.deleteMany({
        _id: {$in: doc.subtext}
    })
   }
});

 module.exports= mongoose.model('BlogPost', BlogPost);