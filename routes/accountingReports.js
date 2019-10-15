var express = require('express');
var router = express.Router();
var reports=require('../decryptoric/reports.js');



router.post('/accountStatment',function(req,res,next){
  var accountId=req.body.accountId;
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  reports.getAccountStatment(accountId,fromDate,toDate).then((result)=>{
    res.status(200).send(result);
  }).catch(()=>{
    res.status(500).send("Error");
  });
});

router.post('/accountStatmentCurrency',function(req,res,next){
  var accountId=req.body.accountId;
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  var currencyId=req.body.currencyId
  reports.getCurrencyAccountStatment(accountId,currencyId,fromDate,toDate).then((result)=>{
    res.status(200).send(result);
  }).catch(()=>{
    res.status(500).send("Error");
  });
});

router.post('/getBalances',function(req,res,next){
  var date=req.body.date;
  reports.getBalances(date).then((result)=>{
    res.status(200).send(result);
  }).catch(()=>{
    res.status(500).send("Error");
  });
});

router.post('/getISBalances',function(req,res,next){
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  reports.getISBalances(fromDate,toDate).then((result)=>{
    res.status(200).send(result);
  }).catch(()=>{
    res.status(500).send("Error");
  });
});


router.post('/getTrialBalance',function(req,res,next){
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  reports.getTrialBalanceBalances(fromDate,toDate).then((result)=>{
    res.status(200).send(result);
  }).catch(()=>{
    res.status(500).send("Error");
  });
});




router.post('/getCharactersticReport',function(req,res,next){
  var character=req.body.character;
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  reports.getCharactersticMovesReport(character,fromDate,toDate).then((result)=>{
    res.status(200).send(result);
  }).catch(()=>{
    res.status(500).send("Error");
  });
});

router.post('/getMajorAccountReport',function(req,res,next){
  var major=req.body.major;
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  reports.getGeneralLedgerReport(major,fromDate,toDate).then((result)=>{
    res.status(200).send(result);
  }).catch((err)=>{
    console.log(err);
    res.status(500).send(err);
  });
});


router.post('/getCashCover',function(req,res,next){
  var cashAccount=req.body.cashAccount;
  var date=req.body.date;
  reports.getCashCover(cashAccount,date).then((cashCoverData)=>{
    res.status(200).send(cashCoverData);
  }).catch((error)=>{
    console.log(error);
    res.status(500).send(error);
  })
});

router.post('/getReceiptsReport',function(req,res,next){
  var from=req.body.fromDate;
  var to=req.body.toDate;
  reports.getReceiptsReport(from,to).then((receipts)=>{
    res.status(200).send(receipts);
  }).catch((error)=>{
    console.log(error);
    res.status(500).send(error);
  })
});




module.exports=router;
