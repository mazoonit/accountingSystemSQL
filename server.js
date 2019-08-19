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

//var reports=require('./decryptoric/reports.js');
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

httpserver.listen(3000,()=>{console.log("Server is up and running sir.");console.log("Server is up sir!");});
