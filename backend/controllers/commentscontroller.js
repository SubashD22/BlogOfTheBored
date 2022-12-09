const asyncHandler = require('express-async-handler');
const BlogPost = require('../Models/BlogPost');
const Comments = require('../Models/Comments');

const getComments = asyncHandler(async(req,res)=>{
      const {id}= req.params;
      const comments = await Comments.find({postId:id}).populate('author','-password');
      if(comments){
        await BlogPost.findByIdAndUpdate(id,{$push:{"comments": comments._id}})
        res.status(200).json(comments)
      }else{
        res.status(400).json({message:'No Comments found'})
      }
})
const newComment = asyncHandler(asyncHandler(async(req,res)=>{
     const {id} = req.params;
     console.log(req.body)
     const addComment = await Comments.create({
        postId: id,
        comment: req.body.text,
        author: req.user._id
     })
     if(addComment){
        await BlogPost.findByIdAndUpdate(id,{$push:{"comments": addComment._id}})
        res.status(200).json(addComment)
     }
}));
const updateComment = asyncHandler(asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const comment = await Comments.findById(id);
    if(comment && comment.author.toString() === req.user._id.toString()){
        const updatedComment = await Comments.findByIdAndUpdate(id,{
            comment:req.body.text
        })
        console.log(updatedComment.comment)
        res.status(200).json(updatedComment)
    }else{
        res.status(400).json({message: Error})
    }
}));
const deleteComment = asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const comment = await Comments.findById(id);
    if(comment && comment.author.toString() === req.user._id.toString()){
        const deletedComment = await Comments.findByIdAndDelete(id)
        res.status(200).json({message:"comment deleted"})
    }else{
        res.status(400).json({message: Error})
    }
})
module.exports = {
    getComments,
    newComment,
    updateComment,
    deleteComment
}