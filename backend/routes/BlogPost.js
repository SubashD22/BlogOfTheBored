const express = require('express');
const { newpost,deletepost,updatepost,getposts,getpost } = require('../controllers/blogpostcontroller');
const router = express.Router();
const protect =require('../middleware/authMiddleware');
const {parser} = require('../cloudinary/config');

router.get('/posts',getposts)
router.get('/post/:id',getpost)
router.post('/newpost',protect,parser.fields([
    {name:'Image',maxCount:1}
]),newpost)
router.delete('/delete/:id',protect,deletepost)
router.put('/update/:id',protect,parser.fields([
    {name:'Image',maxCount:1}
]),updatepost)


module.exports = router