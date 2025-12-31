const User = require('../model/user-model');
const bcrypt = require('bcryptjs');


const home = async (req,res) =>{
   try{
       res.status(200).send("Welcome to home")
   }catch(error){
      next(error)
   }
}

const register =async (req,res,next) =>{
       try{
        const url = req.protocol + '://' + req.get('host');
        const hash_password = await bcrypt.hash(req.body.password,10); 
        const users = new User({
            username:req.body.username,
            password:hash_password,
            email:req.body.email,
            image:url + "/images/" + req.file.filename
        });
        const userExist =await User.findOne({email:req.body.email});
        if(userExist){
            return res.status(400).json({message:"email already exists"});
        }
        users.save().then((user)=>{
            res.status(201).json({
                message:"Registration Successfully",
                id:user._id,
                token:users.generateToken()
            })
        })
       }catch(error){
          next(error)
          res.status(500).json({message:"Internal Server Error"})
    }
   
}

const login = async (req,res) =>{
    try{
          let featchUser;
          User.findOne({email:req.body.email}).then(user=>{
             if(!user){
                return res.status(401).json({
                    message:"Please register first then login"
                })
             }
             this.featchUser = user;
             return bcrypt.compare(req.body.password,this.featchUser.password);
          }).then(result=>{
              if(!result){
                return res.status(401).json({
                    message:"Invalid email and password"
                })
              }
              res.status(200).json({
                 token: this.featchUser.generateToken(),
                 expiresIn:3600,
                 id:this.featchUser._id,
                 image:this.featchUser.image,
                 isAdmin:this.featchUser.isAdmin
              })
          })
    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

const user = (req,res) =>{
    try{
           const userData = req.user;
           console.log(userData);
           res.status(200).json({userData});
    }catch(error){
         //console.log(error);
         res.status(500).json({message:"Internal Server Error"});
    }
}
module.exports = {register,home,login,user}