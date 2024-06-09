const express= require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT=4000;

//import router
const userRouter= require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');

const app=express();
// use middleware
app.use(express.json());

//mount the router
app.use('/v1/user',userRouter);
app.use('/v1/job',jobRoute);

const mongo= process.env.MONGO_URL;

mongoose.connect(mongo).then(()=>{
    console.log("successfully connect to monog DB");
}).catch(err=>{
    console.error(err);
})

app.get('/',(req,res)=>{
    res.send("<h1>This is home page bro</h1>");
});


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})
