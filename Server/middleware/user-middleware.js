const userMiddleware =async (req,res,next) =>{
  try{
        const isUserRole = !req.user.isAdmin;
        if(!isUserRole){
            return res.status(403).json({error:"Access Denied, user is not an admin"}); 
        }
       next();
  }catch(error){
    //console.log(error);
   // next(error);
  }
}

module.exports = userMiddleware;