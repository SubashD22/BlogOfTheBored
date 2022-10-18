const asyncHandler = require('express-async-handler');
const SubText = require('../Models/SubText');
const BlogPost = require('../Models/BlogPost')

const getposts = asyncHandler(async(req,res)=>{
    const Posts = await BlogPost.find({}).populate('author','-password').sort({createdAt:-1})
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
    const Posts = await BlogPost.findById(id).populate('author','-password').populate('subtext')
    if(Posts){
      res.status(200).json(Posts)
    }
    if(!Posts){
        res.status(404)
        throw new Error('posts not found')
    }}
    else if(!id){
        res.status(404)
        throw new Error('invalid id')
    }
})
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
        }else if(!post){
         res.status(400)
         throw new Error('post not found')
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
        res.json({id : req.params.id})
         
    }else{
        res.status(401);
        throw new Error("user not authorised")
    }
});

const updatepost = asyncHandler(async(req,res)=>{
    
    const{title,text,image,subtext} = req.body
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
        if(subtext){
            const sub = await SubText.insertMany(subtext)
            const subId = sub.map(s=>s._id)
            const post = await BlogPost.findByIdAndUpdate(req.params.id,{
                title,
                text,
                image,
                subtext:subId,
                author:req.user._id
            },{new:true}).populate('author','-password').populate('subtext')
            if(post){
              res.status(200).json(post)}
            
        }else if(!subtext){
            const post = await BlogPost.findByIdAndUpdate(req.params.id,{
                title,
                text,
                image,
                author:req.user._id
            },{new:true});
            if(post){
                const updatedPost = await BlogPost.findById(req.params.id).populate('author').populate(subtext)
                res.status(200).json(updatedPost) 
            }
        }
    }
})

module.exports = {newpost,deletepost,updatepost,getposts,getpost}