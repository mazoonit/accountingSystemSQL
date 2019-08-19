const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http=require('http');
const cookieSession=require('cookie-session');
const app = express();
var models=require('./models');
var httpserver=http.createServer(app);
var entry=require('./routes/entry.js');
var receipt=require('./routes/receipt.js');
var account=require('./routes/account.js');
var user=require('./routes/user.js');
var employer=require('./routes/employer.js');
var currency=require('./routes/currency.js');
var product=require('./routes/product.js');
var productI=require('./routes/productI.js');
var request=require('./routes/request.js');

var routes=require('./routes/routes.js');
var gets=require('./routes/gets.js');
var accountingReports=require('./routes/accountingReports.js');

var reports=require('./decryptoric/reports.js');
//var product=require('./decryptoric/product.js');
var Sequelize=require('sequelize');
const Op = Sequelize.Op;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('static',path.join(__dirname,'static'));
app.use('/static',express.static('static'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(cookieSession({
	maxAge:24*60*60*1000,
	keys:["key1","key2"]
}));


// function createMoveLines(moveLinesArr){
//   return new Promise((resolve,reject)=>{
//     models.moveLine.bulkCreate(moveLinesArr).then(()=>{
//       resolve();
//     }).catch((error)=>{
//       reject(error);
//     });
//   });
// }
// app.post('/api/addentry',function(req,res,next){
//   var move={
//     notes:"notes",
//     userId:1
//   };
//   var moveLines=[
//     {
//       debit:1000,
//       credit:0,
//       exchangeRate:1.3,
//       notes:"notes",
//       accountId:3,
//       currencyId:1
//     },
//     {
//       debit:0,
//       credit:1000,
//       exchangeRate:1.3,
//       notes:"notes",
//       accountId:3,
//       currencyId:1
//     }
//   ];
//   var entryy={move:move,moveLines:moveLines};
//   entries.addEntry(entryy).then((entryOut)=>{
//     res.status(200).send(entryOut);
//   }).catch((error)=>{
//     res.status(500).send(error);
//   });
// });
// app.get('/api/addEntry',function(req,res,next){
//   res.send("hello world!");
// });
// app.post('/api/deleteEntry',function(req,res,next){
// });
// app.post('/api/editEntry',function(req,res,next){
//   entries.editEntry(req.body.entry).then((things)=>{
//     res.send(things);
//   }).catch((rejects)=>{
//     res.send(rejects);
//   });
// });
// app.get('/api/getEntry',function(req,res,next){
//   models.move.findOne({
//     where:{id:1},
//     include:[{model:models.moveLine,as:"moveLines"}]
//   }).then((moveRaw)=>{
//     res.send(moveRaw);
//   }).catch((error)=>{
//     res.send(error);
//   })
// });

// app.post('/api/receipt',function(req,res,next){
//   receipts.addReceipt(req.body.receiptObj).then((result)=>{
//     res.send(result);
//   }).catch((err)=>{
//     console.log(err);
//     res.send(err);
//   });
// })

// app.post('/api/receipt',function(req,res,next){
//   receipts.editReceipt(req.body.receiptObj).then((result)=>{
//     res.send(result);
//   }).catch((err)=>{
//     res.send(err);
//   });
// })


app.use('/api/entry',entry);
app.use('/api/receipt',receipt);
app.use('/api/account',account);
app.use('/api/user',user);
app.use('/api/currency',currency);
app.use('/api/employer',employer);
app.use('/api/accountingReports',accountingReports);
app.use('/api/product',product);
app.use('/api/productI',productI);
app.use('/api/request',request);

app.use('/',routes);
app.use('/',gets);

app.get('/',function(req,res){
  // models.moveLine.findAll({
  //   where:{
      // createdAt: {
      //   [Op.gt]: new Date('2019-05-01'),
      //   [Op.lt]: new Date('2019-08-25')
      // }
  //     }
  // }).then((moveLines)=>{
  //     res.send(moveLines);
  // }).catch(()=>{
  //   res.send("false");
  // })
  // models.receipt.findAll({
  //   include:[
  //     {model:models.account,as:"account"},
  //     {model:models.account,as:"cashAcc"}
  //   ]
  // }).then((r)=>{
  //   res.send(r);
  // });
  // producti.addProduct(req.body).then((result)=>{
  //   res.send(result);
  // }).catch((error)=>{
  //   res.send(error);
  // });
  product.deleteProduct(2).then((result)=>{
    res.send(result);
  }).catch((error)=>{
    console.log(error);
    res.send(error);
  });
});
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

httpserver.listen(3000,()=>{console.log("Server is up and running sir.");console.log("blablabla");});
