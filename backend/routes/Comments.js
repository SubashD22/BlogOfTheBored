const express = require('express');
const { getComments, newComment, updateComment, deleteComment } = require('../controllers/commentscontroller');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/comments/:id',getComments)
router.post('/comments/:id',protect,newComment)
router.put('/comments/:id',protect,updateComment)
router.delete('/comments/:id',protect,deleteComment)

module.exports = router