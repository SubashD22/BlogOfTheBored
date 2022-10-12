const express = require('express');
const { newpost,deletepost,updatepost } = require('../controllers/blogpostcontroller');
const router = express.Router();
const protect =require('../middleware/authMiddleware')

router.post('/newpost',protect,newpost);
router.delete('/delete/:id',protect,deletepost)
router.put('/update/:id',protect,updatepost)

module.exports = router