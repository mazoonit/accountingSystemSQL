module.exports={
  cashAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.cashAdd || permissions.cashEdit || permissions.cashRead){
      next();
    }
    else{
      res.send("You are not authorized!");
    }
  },
  dailyEntryAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.dailyEntryAdd || permissions.dailyEntryEdit || permissions.dailyEntryDelete || permissions.dailyEntryRead){
      next();
    }
    else{
      res.send("You are not authorized!");
    }
  },
  usersAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.users){
      next();
    }
    else{
      res.send("You are not authorized!");
    }
  },
  requestsAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.requests){
      next();
    }
    else{
      res.send("You are not authorized!");
    }
  },
  acceptRequestsAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.acceptRequests){
      next();
    }
    else{
      res.send("You are not authorized!");
    }
  },
  accountsAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.accounts){
      next();
    }
    else{
      res.status(403).send("You are not authorized!");
    }
  },
  currenciesAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.currencies){
      next();
    }
    else{
      res.send("You are not authorized!");
    }
  },
  employersAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.employers){
      next();
    }
    else{
      res.send("You are not authorized!");
    }
  },
  reportsAuth:function(req,res,next){
    var permissions=req.session.user.permissions;
    if(permissions.reports){
      next();
    }
    else{
      res.send("You are not authorized!");
    }
  }
}
