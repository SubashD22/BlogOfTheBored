const router = require('express').Router();
const { response } = require('express');
const cloudinary =require('../cloudinary/config')


router.post('/api/delete',async(req,res)=>{
   const{public_id} = req.body;
   const{result} = await cloudinary.uploader.destroy(public_id);
   if(result){
     console.log(result)
     return res.status(200).json(result)
   }
})

module.exports = router
