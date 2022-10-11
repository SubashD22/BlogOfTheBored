const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const User = require('../Models/User')

const registerUser = asyncHandler(async(req,res)=>{
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
       password:hashedPassword
    });
    if(newUser){
        res.status(201).json({
         _id:newUser.id,
         username:newUser.username,
         email:newUser.email,
         token: generateToken(newUser._id)   
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
            token: generateToken(user._id)
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
    getUser
}