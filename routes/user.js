const express = require('express');
var router = express.Router();
const models = require('../models');
var user=require('../decryptoric/user.js');
var bcrypt = require('bcrypt');

router.get('/',function(req,res,next){
  user.getUsers().then((users)=>{
    res.status(200).send(users);
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  });
});



router.post('/',user.checkUniqueUserName,function(req,res,next){
  var userObj={
    username:req.body.username,
    password:req.body.password,
    permissions:req.body.permissions
  };
  user.createUser(userObj).then(()=>{
    res.status(200).send("User has been added successfully!");
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  })
});

// router.post('changePassword',function(req,res,next){
// });


router.put('/',function(req,res,next){
  var userObj={};
  userObj.username=req.body.username ? req.body.username : userObj.username;
  userObj.permissions=req.body.permissions ? req.body.permissions : userObj.permissions;

  user.updateUser(userObj).then((flag)=>{
    if(flag){
      res.status(200).send("User has been updated successfully!");
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
  var password=req.body.newPassword;
  var username=req.body.username;
  var userObj={username:username,password:password};
  user.changePassword(userObj).then((flag)=>{
    if(flag){
      res.status(200).send("Password has been changed successfully!");
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

router.post('/frontGet',function(req,res,next){
  models.user.findOne({where:{active:1,username:req.body.username},attributes:["id","username","permissions"]}).then((userDoc)=>{
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
