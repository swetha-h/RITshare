module.exports={restrictMiddleware:function(req,res,next){
    if(req.isUnauthenticated()){
      req.flash("error","You need to be logged in..");
      return res.redirect('/');
    }
    return next();
  }
}
  