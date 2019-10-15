module.exports={
  dailyEntryAdd:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.dailyEntryAdd){
      next();
    }
    else{
      res.status(403).send("You are not authorized!");
    }
  },
  dailyEntryEdit:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.dailyEntryEdit){
      next();
    }
    else{
      res.status(403).send("You are not authorized!");
    }
  },
  dailyEntryDelete:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.dailyEntryDelete){
      next();
    }
    else{
      res.status(403).send("You are not authorized!");
    }
  },
  dailyEntryRead:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.dailyEntryRead){
      next();
    }
    else{
      res.status(403).send("You are not authorized!");
    }
  },
  cashAdd:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.cashAdd){
      next();
    }
    else{
      res.status(403).send("You are not authorized!");
    }
  },
  cashEdit:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.cashEdit){
      next();
    }
    else{
      res.status(403).send("You are not authorized!");
    }
  },
  cashRead:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.cashRead){
      next();
    }
    else{
      res.status(403).send("You are not authorized!");
    }
  },

}
