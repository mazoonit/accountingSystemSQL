var express = require('express');
var router = express.Router();
var receipts=require('../decryptoric/receipts.js');
var models=require('../models');



router.post('/frontGet',function(req,res,next){
  receipts.getReceipt(req.body.id,req.body.type).then((receiptObj)=>{
    if(!receiptObj){
      res.status(404).send("Receipt is not found!");
    }
    else{
      res.status(200).send(receiptObj);
    }
  }).catch((err)=>{
    res.status(500).send(err);
  });
});


router.post('/',function(req,res,next){
    var receiptObj=req.body.receiptObj;
    receiptObj.userId=req.session.user.id;
    receipts.addReceipt(receiptObj).then((result)=>{
      if(result){res.status(200).send(result);}
      else{res.status(400).send(result);}
    }).catch((err)=>{
      res.status(500).send(err);
    });
});


router.put('/',function(req,res,next){
  var receiptObj=req.body.receiptObj;
  var type=req.body.type;
  receiptObj.userId=req.session.user.id;
  receipts.editReceipt(receiptObj,type).then((result)=>{
    if(result){
      res.status(200).send(result);
    }
    else{
      res.status(400).send(result);
    }
  }).catch((err)=>{
    res.status(500).send(err);
  });
});


router.delete('/',function(req,res,next){
  receipts.deleteReceipt(req.body.id,req.body.type).then((result)=>{
    res.status(200).send("Receipt has been deleted successfully!");
  }).catch((err)=>{
    res.status(500).send(err);
  });
});


router.get('/getPendingReceipts',function(req,res,next){
  models.receipt.findAll({where:{status:"pending"}}).then((receiptRaws)=>{
    res.status(200).send(receiptRaws);
  }).catch((error)=>{
    res.status(500).send(error);
  });
});

module.exports=router;
