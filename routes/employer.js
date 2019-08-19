var express = require('express');
var router = express.Router();
var employers=require('../decryptoric/employers.js');
var models=require('../models');
var employer=models.employer;
var checkUniqueName=employers.checkUniqueName;
var checks=[checkUniqueName];

router.get('/',function(req,res,next){
  employer.findAll().then((employerRaws)=>{
    res.status(200).send(employerRaws);
  }).catch((error)=>{
    res.status(500).send(error);
  });
});



router.get('/:id',function(req,res,next){
  employer.findOne({where:{id:req.params.id}}).then((employerObj)=>{
    if(employerObj){
      res.status(200).send(employerObj);
    }
    else{
      res.status(404).send("Employer is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});



router.post('/',checks,function(req,res,next){
  var employerObj=req.body;
  employer.create(employerObj).then((employer)=>{
    res.status(200).send(employer);
  }).catch((err)=>{
    res.status(500).send(err);
  });
});


router.put('/',function(req,res,next){
  var employerObj={};
  employerObj.name=req.body.name ? req.body.name : employerObj.name;
  employer.update(employerObj,{where:{id:req.body.id}}).then(()=>{
    res.status(200).send("Employer has been updated successfully!");
  }).catch((err)=>{
    res.status(500).send(err);
  });
});


router.delete('/',function(req,res,next){
  // entries.deleteEntry(req.body.id).then(()=>{
  //   res.status(200).send("Entry has been deleted successfully!");
  // }).catch((error)=>{
  //   res.status(500).send(error);
  // });
  employer.destroy({where:{id:req.body.id}}).then(()=>{
    res.status(200).send("Employer has been deleted successfully!");
  }).catch((err)=>{
    res.status(500).send(err);
  });
});


router.post('/frontGet',function(req,res,next){
  employer.findOne({where:{id:req.body.id}}).then((employerObj)=>{
    if(employerObj){
      res.status(200).send(employerObj);
    }
    else{
      res.status(404).send("Employer is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});




module.exports=router;
