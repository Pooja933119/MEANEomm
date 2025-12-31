const jwt = require("jsonwebtoken");
const User = require('../model/user-model');

const authMiddleware =async (req,res,next) =>{
   
          const token = req.header("Authorization");
          if(!token){
              res.status(401).json({message:"Unauthorized HTTP, Token not provided"})
          }
          const jwt_token = token.replace('Bearer',"").trim();
          //console.log(jwt_token);
         
    try{
          const isVerified = jwt.verify(jwt_token,process.env.JWS_SECRET_KEY);
          console.log(isVerified);
          const userData = await User.findOne({email:isVerified.email}).select({password:0});
          console.log(userData);
          req.user = userData;
          req.token = token;
          req.userId = userData._id;
          req.isAdmin = userData.isAdmin;
          next();      
    }catch(error){
        console.log(error)
       // next(error)
    }
}

module.exports = authMiddleware;