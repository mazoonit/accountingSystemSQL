var models=require("../models");
var account=models.account;

module.exports={
  checkUniqueName:function(req,res,next){
    account.findOne({where:{name:req.body.name}}).then((accountObj)=>{
      if(accountObj){res.status(400).send("Account name is duplicated!");}
      else{next();}
    }).catch(()=>{
      res.status(500).send("Internal server error,Try again.");
    });
  },
  checkUniqueId:function(req,res,next){
    account.findOne({where:{id:req.body.id}}).then((accountObj)=>{
      if(accountObj){res.status(400).send("Account ID is duplicated!");}
      else{next();}
    }).catch(()=>{
      res.status(500).send("Internal server error,Try again.");
    });
  }

}
