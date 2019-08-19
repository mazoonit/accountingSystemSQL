var express = require('express');
var router = express.Router();
var accounts=require('../decryptoric/accounts.js');
var models=require('../models');
var account=models.account;
var checkUniqueId=accounts.checkUniqueId;
var checkUniqueName=accounts.checkUniqueName;
var checks=[checkUniqueId,checkUniqueName];

router.get('/',function(req,res,next){
  account.findAll().then((accountRaws)=>{
    res.status(200).send(accountRaws);
  }).catch((error)=>{
    res.status(500).send(error);
  });
});



router.get('/:id',function(req,res,next){
  account.findOne({where:{id:req.params.id}}).then((accountObj)=>{
    if(accountObj){
      res.status(200).send(accountObj);
    }
    else{
      res.status(404).send("Account is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});



router.post('/',checks,function(req,res,next){
  var accountObj=req.body;
  account.create(accountObj).then((account)=>{
    res.status(200).send(account);
  }).catch((err)=>{
    res.status(500).send(err);
  });
});


router.put('/',function(req,res,next){
  var accountObj={};
  accountObj.name=req.body.name ? req.body.name : accountObj.name;
  accountObj.accountNature=req.body.accountNature ? req.body.accountNature : accountObj.accountNature;
  accountObj.type=req.body.type ? req.body.type : accountObj.type;
  accountObj.major=req.body.major ? req.body.major : accountObj.major;
  accountObj.debit=req.body.debit ? req.body.debit : accountObj.debit;
  accountObj.credit=req.body.credit ? req.body.credit : accountObj.credit;
  accountObj.exchangeRate=req.body.exchangeRate ? req.body.exchangeRate : accountObj.exchangeRate;
  accountObj.character=req.body.character ? req.body.character : accountObj.character;
  accountObj.currencyId=req.body.currencyId ? req.body.currencyId : accountObj.currencyId;
  account.update(accountObj,{where:{id:req.body.id}}).then(()=>{
    res.status(200).send("Account has been updated successfully!");
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
  account.destroy({where:{id:req.body.id}}).then(()=>{
    res.status(200).send("Account has been deleted successfully!");
  }).catch((err)=>{
    res.status(500).send(err);

  });
});


router.post('/frontGet',function(req,res,next){
  account.findOne({where:{id:req.body.id}}).then((accountObj)=>{
    if(accountObj){
      res.status(200).send(accountObj);
    }
    else{
      res.status(404).send("Account is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});

router.post('/check',function(req,res,next){
  account.findOne({where:{id:req.body.id,character:req.body.type}}).then((accountObj)=>{
    if(accountObj){
      res.status(200).send(accountObj);
    }
    else{
      res.status(404).send("Account is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});

router.post('/checkType',function(req,res,next){
  account.findOne({where:{id:req.body.id,type:req.body.type}}).then((accountObj)=>{
    if(accountObj){
      res.status(200).send(accountObj);
    }
    else{
      res.status(404).send("Account is not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});









module.exports=router;
