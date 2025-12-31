const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type:Object,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})
//generate token
userSchema.methods.generateToken = function(){
    try{
          return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            username:this.username,
            image:this.image, 
            isAdmin:this.isAdmin
          },process.env.JWS_SECRET_KEY)
    }catch(err){
       // console.log(err);
    }
}
userSchema.methods.comparePassword = function(password){
   return bcrypt.compare(password,this.password);
}

const User =new mongoose.model("User",userSchema);//collectionname,scehmaname

module.exports = User;