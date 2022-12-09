const { json } = require('express');
const express = require('express');
const mongooose = require('mongoose');
const cors = require('cors')
const del = require('./routes/delete')
const bodyParser = require('body-parser')
require('dotenv').config();
const PORT = process.env.PORT
const db = process.env.MONGO_URI;


mongooose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected to database')).catch((err)=>console.log(err))

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));;
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
app.get('/',(req,res)=>{
res.send('hello')
})
app.use('/', del)
app.use('/api',require('./routes/User'))
app.use('/api',require('./routes/BlogPost'));
app.use('/api',require('./routes/Comments'));

app.listen(PORT,()=>{
    console.log(`connected to localhost:${PORT}`)
})