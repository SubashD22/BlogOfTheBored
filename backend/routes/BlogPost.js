const express = require('express');
const { newpost } = require('../controllers/blogpostcontroller');
const router = express.Router();
const protect =require('../middleware/authMiddleware')

router.post('/newpost',protect,newpost)

module.exports = router