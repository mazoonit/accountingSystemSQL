var models=require("../models");
var employer=models.employer;

module.exports={
  checkUniqueName:function(req,res,next){
    employer.findOne({where:{name:req.body.name}}).then((employerObj)=>{
      if(employerObj){res.status(400).send("Employer name is duplicated!");}
      else{next();}
    }).catch(()=>{
      res.status(500).send("Internal server error,Try again.");
    });
  }
}
