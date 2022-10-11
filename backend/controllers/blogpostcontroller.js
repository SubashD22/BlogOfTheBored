const asyncHandler = require('express-async-handler');
const SubText = require('../Models/SubText');
const BlogPost = require('../Models/BlogPost')


const newpost = (asyncHandler(async(req,res)=>{
    const{title,text,image,subtext} = req.body
    if(subtext){
        const sub = await SubText.insertMany(subtext)
        const subId = sub.map(s=>s._id)
        const post = await BlogPost.create({
            title,
            text,
            image,
            subtext:subId,
            author:req.user._id
        })
        if(post){
          res.status(200).json(post)
        }
    }else if(!subtext){
        const post = await BlogPost.create({
            title,
            text,
            image,
            author:req.user._id
        });
        if(post){
            res.status(200).json(post) 
        }
    }
    
    
}))

module.exports = {newpost}