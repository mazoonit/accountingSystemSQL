var express = require('express');
var router = express.Router();
var currencies=require('../decryptoric/currencies.js');
var models=require('../models');
var currency=models.currency;
var checkUniqueAbb=currencies.checkUniqueAbb;
var checkUniqueName=currencies.checkUniqueName;
var checkUniqueId=currencies.checkUniqueId;

var checks=[checkUniqueName,checkUniqueAbb,checkUniqueId];

router.get('/',function(req,res,next){
  currency.findAll().then((currencyRaws)=>{
    res.status(200).send(currencyRaws);
  }).catch((error)=>{
    res.status(500).send(error);
  });
});



router.get('/:id',function(req,res,next){
  currency.findOne({where:{id:req.params.id}}).then((currencyObj)=>{
    if(currencyObj){
      res.status(200).send(currencyObj);
    }
    else{
      res.status(404).send("Currency is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});



router.post('/',checks,function(req,res,next){
  var currencyObj=req.body;
  currency.create(currencyObj).then((currency)=>{
    res.status(200).send(currency);
  }).catch((err)=>{
    res.status(500).send(err);
  });
});


router.put('/',function(req,res,next){
  var currencyObj={};
  currencyObj.name=req.body.name ? req.body.name : currencyObj.name;
  currencyObj.abb=req.body.abb ? req.body.abb : currencyObj.abb;
  currency.update(currencyObj,{where:{id:req.body.id}}).then(()=>{
    res.status(200).send("Currency has been updated successfully!");
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
  currency.destroy({where:{id:req.body.id}}).then(()=>{
    res.status(200).send("Currency has been deleted successfully!");
  }).catch((err)=>{
    res.status(500).send(err);
  });
});

router.post('/frontGet',function(req,res,next){
  currency.findOne({where:{id:req.body.id}}).then((currencyObj)=>{
    if(currencyObj){
      res.status(200).send(currencyObj);
    }
    else{
      res.status(404).send("Currency is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});



module.exports=router;
