var express = require('express');
var router = express.Router();
var entries=require('../decryptoric/entries.js');
var auth = require("../decryptoric/auth.js");
var advancedAuth=require("../decryptoric/advancedAuth.js");
var detailedAdvancedAuth=require("../decryptoric/detailedAdvancedAuth.js");
var basicAuth=auth.basicAuth;

router.get('/:id',function(req,res,next){
  entries.getEntry(req.params.id).then((entryObj)=>{
    if(entryObj){
      res.status(200).send(entryObj);
    }
    else{
      res.status(404).send("Entry is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  })
});

router.post('/frontGet',[basicAuth,detailedAdvancedAuth.dailyEntryRead],function(req,res,next){
  entries.getEntry(req.body.id).then((entryObj)=>{
    if(entryObj){
      res.status(200).send(entryObj);
    }
    else{
      res.status(404).send("Entry is not found!");
    }
  }).catch((error)=>{
    console.log(error);
    res.status(500).send(error);
  })
});



router.post('/',[basicAuth,detailedAdvancedAuth.dailyEntryAdd],function(req,res,next){
  var entryObj=req.body.entry;
  entryObj.move.userId=req.session.user.id;
  entries.addEntry(entryObj).then((entryOut)=>{
    res.status(200).send(entryOut);
  }).catch((error)=>{
    res.status(500).send(error);
  });
});


router.put('/',[basicAuth,detailedAdvancedAuth.dailyEntryEdit],function(req,res,next){
  var entryObj=req.body.entry;
  entryObj.move.userId=req.session.user.id;
  entries.editEntry(entryObj).then((things)=>{
    res.send(things);
  }).catch((rejects)=>{
    res.status(500).send(rejects);
  });
});


router.delete('/',[basicAuth,detailedAdvancedAuth.dailyEntryDelete],function(req,res,next){
  entries.deleteEntry(req.body.id).then(()=>{
    res.status(200).send("Entry has been deleted successfully!");
  }).catch((error)=>{
    res.status(500).send(error);
  })
});









module.exports=router;
