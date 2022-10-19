const express = require('express');
const parser = require('../cloudinary/config');
const router = express.Router();

router.post('/test',parser.fields([
    {
        name: "mainImage", maxCount:1
    },
    {
        name: "subImage"
    }
]),async(req,res)=>{
    const subsI = req.files.subImage;
    const subs = req.body.subtitle
    const subtext = subs.map((s,i)=>({
        title:s[i],
        image:subsI[i].path,
        id:subsI[i].filename
    }))
    res.json(subtext)
})

module.exports = router