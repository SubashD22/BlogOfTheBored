const express = require('express');
const { newpost,deletepost,updatepost,getposts,getpost } = require('../controllers/blogpostcontroller');
const router = express.Router();
const protect =require('../middleware/authMiddleware')

router.post('/newpost',protect,newpost);
router.get('/posts',getposts)
router.get('/post/:id',getpost)
router.delete('/delete/:id',protect,deletepost)
router.put('/update/:id',protect,updatepost)

module.exports = router