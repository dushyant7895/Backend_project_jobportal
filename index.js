const express= require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT=4000;

const app=express();

const mongo= process.env.MONGO_URL;

mongoose.connect(mongo).then(()=>{
    console.log("successfully connect to monog DB");
}).catch(err=>{
    console.error(err);
})

app.get('/',(req,res)=>{
    res.send("Hello badde bhai");
})
app.get('/health',(req,res)=>{
    res.json({
        message:'Api working is fine',
        status:"working fine",
        date: new Date().toLocaleDateString()
    })
})

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})
