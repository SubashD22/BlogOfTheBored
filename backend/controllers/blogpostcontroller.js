const asyncHandler = require('express-async-handler');
const BlogPost = require('../Models/BlogPost');
const {parser} = require('../cloudinary/config')

const getposts = asyncHandler(async(req,res)=>{
    const Posts = await BlogPost.find({}).populate('author','-password').sort({createdAt:-1}).limit(3)
    if(Posts){
      res.status(200).send(Posts)
    }
    if(!Posts){
        res.status(404)
        throw new Error('posts not found')
    }
})
const getallposts = asyncHandler(async(req,res)=>{
    const Posts = await BlogPost.find({}).populate('author','-password')
    if(Posts){
      res.status(200).send(Posts)
    }
    if(!Posts){
        res.status(404)
        throw new Error('posts not found')
    }
})
const getpost = asyncHandler(async(req,res)=>{
    const id = req.params.id
    
    if(id){
    const Post = await BlogPost.findById(id).populate('author','-password')
    if(Post){
      res.status(200).json(Post)
    }
    if(!Post){
        res.status(404)
        throw new Error('posts not found')
    }}
    else if(!id){
        res.status(404)
        throw new Error('invalid id')
    }
})
const newpost = (asyncHandler(async(req,res)=>{
    const{Title,Text,Categories:categories} = req.body
    console.log(categories)
    if(req.files.Image){
        const post = await BlogPost.create({
            title:Title,
            text:Text,
            categories,
            image:req.files.Image[0].path,
            imageId:req.files.Image[0].filename,
            images:req.body.Images,
            author:req.user._id
        });
        if(post){
            res.status(200).json(post._id)
          }else if(!post){
           res.status(400)
           throw new Error('post not found')
          };
    }else{
        const post = await BlogPost.create({
            title:Title,
            text:Text,
            author:req.user._id,
            images:req.body.Images
        });
        if(post){
            res.status(200).json(post._id)
          }else if(!post){
           res.status(400)
           throw new Error('post not found')
          }
    }
}));

const deletepost = asyncHandler(async(req,res)=>{
    const post = await BlogPost.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new Error('post not found')
    }
    
    if(!req.user){
        res.status(401);
        throw new Error("user not found");
    }
    if(post.author.toString() === req.user.id){
        const deletedPost = await BlogPost.findByIdAndDelete(
            req.params.id
        ) 
        console.log('deleted')
        res.status(200).json({message : "successfully deleted"})
         
    }else{
        res.status(401);
        throw new Error("user not authorised")
    }
});

const updatepost = asyncHandler(async(req,res)=>{
    
    const post = await BlogPost.findById(req.params.id)
    if(!post){
        res.status(400);
        throw new Error('post not found')
    }
    if(!req.user){
        res.status(401);
        throw new Error("user not found");
    }
    if(post.author.toString() === req.user.id){
        const{Title,Text} = req.body
    if(req.files.Image){
        const{Title,Text} = req.body
        const post = await BlogPost.findByIdAndUpdate(req.params.id,{
            title:Title,
            text:Text,
            image:req.files.Image[0].path,
            imageId:req.files.Image[0].filename,
            images:req.body.Images,
            author:req.user._id
        });
        if(post){
            res.status(200).json(post._id)
          }else if(!post){
           res.status(400)
           throw new Error('post not found')
          };
    }else{
        const post = await BlogPost.findByIdAndUpdate(req.params.id,{
            title:Title,
            text:Text,
            author:req.user._id,
            images:req.body.Images
        });
        if(post){
            res.status(200).json(post._id)
          }else if(!post){
           res.status(400)
           throw new Error('post not found')
          }
    }
}
})

module.exports = {newpost,deletepost,updatepost,getposts,getpost,getallposts}