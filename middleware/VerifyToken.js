const jwt = require('jsonwebtoken');

const VerifyToken =(req,res,next)=>{
    try {
        const token = req.header('Authorization').split(' ')[1];
        if(!token) return res.status(401).json({message:"Token not found or valid"});
        const decode = jwt.verify(token,'secret');
        console.log(decode);
        req.user= decode;
        next();
        //bearer 21324wdfefdsfefef3242 (Token look like this)
    } catch (error) {
        return res.status(401).json({message:"Token not found or valid"});
    }
};

module.exports=VerifyToken;