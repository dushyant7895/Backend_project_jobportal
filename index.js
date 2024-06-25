const express= require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT=4000;
//import router
const userRouter= require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');
//import middleware

const ErrorHandler=require('./middleware/ErrorHandler');
const cors = require('cors');

const app=express();

app.use(cors());
// use middleware
app.use(express.json());

//mount the router
app.use('/user',userRouter);
app.use('/job', 
    // VerifyToken, 
    jobRoute); // next() send the token into jobRoute

const mongo= process.env.MONGO_URL;

mongoose.connect(mongo).then(()=>{
    console.log("successfully connect to monog DB");
}).catch(err=>{
    console.error(err);
})

app.get('/',(req,res)=>{
    res.send("<h1>This is home page bro</h1>");
});

app.get('*',(req,res)=>{
    res.status(500).json({
        message:"This router is wrong",
        status:"Error"
    });
});

app.use(ErrorHandler);

app.listen(PORT,()=>{
    console.clear();
    console.log(`Server started at ${PORT}`);
})
