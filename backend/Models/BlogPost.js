const mongoose = require('mongoose');
const {cloudinary} =require('../cloudinary/config')

const Schema = mongoose.Schema;
const Comment = require('./Comments');




const BlogPost = new Schema (
    {
        title: {
            type:String,
            required:true
        },
        image: String,
        images:{
            type:Array
        },
        imageId: String,
        text: {
            type:String,
        },
        categories:{
            type:[String],
            enum:['hobby','travel','food','music','games','lifestyle','fashion','movies','sports','story']
        },
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
    await Comment.deleteMany({
        _id: {$in: doc.comments}
    })
    const image = await cloudinary.uploader.destroy(doc.imageId);
   if(image.result){
     console.log(image.result)
   }
     doc.images.forEach(async(element) => {
        if(element){
      const images= await cloudinary.uploader.destroy(element);
      if(images.result){
      console.log(images.result)}
    }
   });
  
   }
});

 module.exports= mongoose.model('BlogPost', BlogPost);