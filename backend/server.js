const { json } = require('express');
const express = require('express');
const mongooose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT
const db = process.env.MONGO_URI;

mongooose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected to database')).catch((err)=>console.log(err))

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(PORT,()=>{
    console.log(`connected to localhost:${PORT}`)
})