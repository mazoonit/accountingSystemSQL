const express = require('express');
var router = express.Router();
const models = require('../models');
var user=models.user;
var bcrypt = require('bcrypt');


router.get('/',function(req,res,next){
  user.findAll({where:{active:1},attributes:["id","username","permissions"]}).then((users)=>{
    res.status(200).send(users);
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  });
});



router.post('/',function(req,res,next){
  user.create({
    username:req.body.username,
    password:req.body.password,
    permissions:req.body.permissions
  }).then((userDoc)=>{
    res.status(200).send("User has been created successfully!");
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  });
});

// router.post('changePassword',function(req,res,next){
// });


router.put('/',function(req,res,next){
  var userObj={};
  userObj.username=req.body.username ? req.body.username : userObj.username;
  userObj.permissions=req.body.permissions ? req.body.permissions : userObj.permissions;

  user.update(userObj,{where:{username:req.body.username}}).then((userDoc)=>{
    res.status(200).send("User has been updated successfully!");
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  });
});

router.delete('/',function(req,res,next){
  var userObj={};
  userObj.active=0;
  user.update(userObj,{where:{username:req.body.username}}).then((userDoc)=>{
    res.status(200).send("User has been deleted successfully!");
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  });
});


router.post('/changePassword',function(req,res,next){
  var password=req.body.password;
  const salt=bcrypt.genSaltSync();
  password=bcrypt.hashSync(password,salt);
  user.update({password:password},{where:{id:req.body.id}}).then((userDoc)=>{
    res.status(200).send("Password changed successfully!");
  }).catch((error)=>{
    res.status(500).send(error);
  });
});

router.post('/frontGet',function(req,res,next){
  user.findOne({where:{active:1,username:req.body.username},attributes:["id","username","permissions"]}).then((userDoc)=>{
    if(userDoc){
      res.status(200).send(userDoc);
    }
    else{
      res.status(404).send("User is not found!");
    }
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  });
});


module.exports = router;
