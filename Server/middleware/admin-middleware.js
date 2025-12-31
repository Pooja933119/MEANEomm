const adminMiddleware =async (req,res,next) =>{
  try{
        const isAdminRole = req.user.isAdmin;
        if(!isAdminRole){
            return res.status(403).json({error:"Access Denied, User is an admin"}); 
        }
       next();
  }catch(error){
    //console.log(error);
   // next(error);
  }
}

module.exports = adminMiddleware;