const express = require('express');
const dotenv = require('dotenv').config()
const Port = process.env.PORT

const app = express();

app.listen(Port,()=>{
    console.log('listening')
})