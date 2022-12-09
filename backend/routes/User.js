const express = require('express');
const { Dpparser } = require('../cloudinary/config');
const router = express.Router();
const{registerUser,loginUser,getUser,verifyEmail}=require('../controllers/userController');
const protect =require('../middleware/authMiddleware')

router.post('/register',Dpparser.fields([
    {name:'Dp',maxCount:1}
]),registerUser)
router.post('/login',loginUser)
router.put('/profile/:id',protect,Dpparser.fields([
    {name:'Dp',maxCount:1}
]),getUser)
router.get('/verify',protect,verifyEmail)

module.exports = router