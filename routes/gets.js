var express = require('express');
var router = express.Router();
var auth = require("../decryptoric/auth.js");
var basicAuth=auth.basicAuth;
var bcrypt=require('bcrypt');
const cookieSession=require('cookie-session');


//routes for every page
router.get('/paymentEntry',basicAuth,function(req,res){
	res.render('paymentEntry.ejs',{user:req.session.user});

});
router.get('/paymentRequest',basicAuth,function(req,res){
	res.render('paymentRequest.ejs',{user:req.session.user});

});
router.get('/receiveEntry',basicAuth,function(req,res){
	res.render('receiveEntry.ejs',{user:req.session.user});

});
router.get('/receiveRequest',basicAuth,function(req,res){
	res.render('receiveRequest.ejs',{user:req.session.user});

});
router.get('/dailyentry',basicAuth,function(req,res){
	res.render('dailyEntry.ejs',{user:req.session.user});
});
router.get('/cashmove',basicAuth,function(req,res){
	res.render('cashMove.ejs',{user:req.session.user});
});
router.get('/accountingStatements',basicAuth,function(req,res){
	res.render('accountingStatements.ejs',{user:req.session.user});
});
router.get('/accountingreports',basicAuth,function(req,res){
	res.render('accountingReports.ejs',{user:req.session.user});
});
router.get('/customizedReports',basicAuth,function(req,res){
	res.render('customizedReports.ejs',{user:req.session.user});
});
router.get('/bspReports',basicAuth,function(req,res){
	res.render('bspReports.ejs',{user:req.session.user});
});
router.get('/lowcostReports',basicAuth,function(req,res){
	res.render('lowcostReports.ejs',{user:req.session.user});
});
router.get('/accountPage',basicAuth,function(req,res){
	res.render('accountPage.ejs',{user:req.session.user});
});
router.get('/currency',basicAuth,function(req,res){
	res.render('currency.ejs',{user:req.session.user});
});
router.get('/user',function(req,res){
	res.render('users.ejs',{user:req.session.user});
});
router.get('/bspticket',basicAuth,function(req,res){
	res.render('bspTicket.ejs',{user:req.session.user});
});
router.get('/lowcostTicket',basicAuth,function(req,res){
	res.render('lowcostTicket.ejs',{user:req.session.user});
});
router.get('/insurancepolicy',basicAuth,function(req,res){
	res.render('insurancePolicy.ejs',{user:req.session.user});
});
router.get('/umrah',basicAuth,function(req,res){
	res.render('umrah.ejs',{user:req.session.user});
});

router.get('/employer',basicAuth,function(req,res){
	res.render('employer.ejs',{user:req.session.user});
});

router.get('/requests',basicAuth,function(req,res,next){
	request.find({status:"pending"}).populate("employer").exec(function(err,doc){
		if(err){
			var error=new Error(err);
			error.status=500;
			next(error);
		}
		else if(!doc){
			var error=new Error("There's No Requests!");
			error.status=404;
			next(error);
		}
		else{
			res.render("requests.ejs",{rows:doc,user:req.session.user});
		}
	});
});




module.exports = router;
