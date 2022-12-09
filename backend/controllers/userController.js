const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const User = require('../Models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Token = require('../Models/Token');
require('dotenv').config();

const sendEmail = async(email,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service:process.env.SERVICE,
            post:process.env.EMAIL_PORT,
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text
        });
        console.log('Email sent Successfully')
    }catch(err){
        console.log('Email not sent');
        console.log(err)
    }
}
const verifyEmail = asyncHandler(async(req,res)=>{
const token = await Token.create({
    userId:req.user._id,
    token:crypto.randomBytes(32).toString('hex')
});
 if(token){
    const url = `http://localhost:5000/api/user/${token.userId}/verify/${token.token}`;
    try {
    await sendEmail(req.user.email,"Email verification",url);
    res.status(201).json({message: 'A mail has been sent to your Email'})
    } catch (error) {
        res.status(400).json({message: 'invalid Email'})
    } 
 }
})

const registerUser = asyncHandler(async(req,res)=>{
    console.log(req.files)
    const{username,email,password}=req.body;
    if( !username || !email || !password){
        res.status(400);
        throw new Error("please fill all feilds")
    };
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400);
        throw new Error("user already exist")
    };
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({
       username,
       email,
       profilePic:req.files.Dp[0].path,
       picId:req.files.Dp[0].filename,
       password:hashedPassword
    });
    if(newUser){
        res.status(201).json({
         _id:newUser.id,
         username:newUser.username,
         email:newUser.email,
         profilePic:newUser.profilePic,
         token: generateToken(newUser._id),
         verified:newUser.verified,
         author:newUser.author   
        });}else{
            res.status(400)
            throw new Error("invalid user data")
        }
});

const loginUser = asyncHandler(async(req,res)=>{
    const{username,password} = req.body;
    const user = await User.findOne({username});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            username:user.username,
            email:user.email,
            profilePic:user.profilePic,
            token: generateToken(user._id),
            verified: user.verified,
            author:user.author
        })
    }else{
        res.status(400);
        throw new Error("invalid credentials")
    }
});
const getUser = asyncHandler(async(req,res)=>{
    res.status(200). json(req.user)
});
const generateToken = (id)=>{
    return Jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}


module.exports={
    registerUser, 
    loginUser,
    getUser,
    verifyEmail
}