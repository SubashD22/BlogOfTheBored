const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const BlogPostSchema = new Schema (
    {
        title: {
            type:String,
            required:true
        },
        image: String,
        text: {
            type:String,
            required:true
        },
        author:{
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        reviews:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    },{timestamps:true}
);

//BlogPost.post('findOneAndDelete', async function(doc){
//   if(doc){
//    await Review.deleteMany({
//        _id: {$in: doc.reviews}
//    })
//   }
//})

 BlogPost = mongoose.model('BlogPost', BlogPostSchema);
 module.exports=BlogPost