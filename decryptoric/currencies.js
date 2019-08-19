var models=require("../models");
var currency=models.currency;

module.exports={
  checkUniqueName:function(req,res,next){
    currency.findOne({where:{name:req.body.name}}).then((currencyObj)=>{
      if(currencyObj){res.status(400).send("Currency name is duplicated!");}
      else{next();}
    }).catch(()=>{
      res.status(500).send("Internal server error,Try again.");
    });
  },
  checkUniqueAbb:function(req,res,next){
    currency.findOne({where:{abb:req.body.abb}}).then((currencyObj)=>{
      if(currencyObj){res.status(400).send("Currency abb is duplicated!");}
      else{next();}
    }).catch(()=>{
      res.status(500).send("Internal server error,Try again.");
    });
  },
  checkUniqueId:function(req,res,next){
    currency.findOne({where:{id:req.body.id}}).then((currencyObj)=>{
      if(currencyObj){res.status(400).send("Currency code is duplicated!");}
      else{next();}
    }).catch(()=>{
      res.status(500).send("Internal server error,Try again.");
    });
  }


}
