var express = require('express');
var router = express.Router();
var auth = require("../decryptoric/auth.js");
var advancedAuth=require("../decryptoric/advancedAuth.js");
var models = require("../models");
var request=models.request;

var basicAuth=auth.basicAuth;
var bcrypt=require('bcrypt');
const cookieSession=require('cookie-session');

function cashAuth(req,res,next){
	var user=req.session.user;
	if(user.permissions.CashAdd){
		next();
	}
	else{
		res.send("You are not authorized to be here!");
	}
}
//routes for every page
router.get('/paymentEntry',[basicAuth,advancedAuth.cashAuth],function(req,res){
	res.render('paymentEntry.ejs',{user:req.session.user});
});
router.get('/paymentRequest',[basicAuth,advancedAuth.requestsAuth],function(req,res){
	res.render('paymentRequest.ejs',{user:req.session.user});

});
router.get('/receiveEntry',[basicAuth,advancedAuth.cashAuth],function(req,res){
	res.render('receiveEntry.ejs',{user:req.session.user});

});
router.get('/receiveRequest',[basicAuth,advancedAuth.requestsAuth],function(req,res){
	res.render('receiveRequest.ejs',{user:req.session.user});
});
router.get('/dailyentry',[basicAuth,advancedAuth.dailyEntryAuth],function(req,res){
	res.render('dailyEntry.ejs',{user:req.session.user});
});
router.get('/cashmove',basicAuth,function(req,res){
	res.render('cashMove.ejs',{user:req.session.user});
});
router.get('/accountingStatements',[basicAuth,advancedAuth.reportsAuth],function(req,res){
	res.render('accountingStatements.ejs',{user:req.session.user});
});
router.get('/accountingreports',[basicAuth,advancedAuth.reportsAuth],function(req,res){
	res.render('accountingReports.ejs',{user:req.session.user});
});
router.get('/customizedReports',[basicAuth,advancedAuth.reportsAuth],function(req,res){
	res.render('customizedReports.ejs',{user:req.session.user});
});
router.get('/bspReports',[basicAuth,advancedAuth.reportsAuth],function(req,res){
	res.render('bspReports.ejs',{user:req.session.user});
});
router.get('/lowcostReports',[basicAuth,advancedAuth.reportsAuth],function(req,res){
	res.render('lowcostReports.ejs',{user:req.session.user});
});
router.get('/umrahReports',[basicAuth,advancedAuth.reportsAuth],function(req,res){
	res.render('umrahReports.ejs',{user:req.session.user});
});
router.get('/hajjReports',[basicAuth,advancedAuth.reportsAuth],function(req,res){
	res.render('hajjReports.ejs',{user:req.session.user});
});
router.get('/accountPage',[basicAuth,advancedAuth.accountsAuth],function(req,res){
	res.render('accountPage.ejs',{user:req.session.user});
});
router.get('/currency',[basicAuth,advancedAuth.currenciesAuth],function(req,res){
	res.render('currency.ejs',{user:req.session.user});
});
router.get('/user',function(req,res){
	res.render('users.ejs',{user:req.session.user});
});
router.get('/bspticket',[basicAuth,advancedAuth.dailyEntryAuth],function(req,res){
	res.render('bspTicket.ejs',{user:req.session.user});
});
router.get('/lowcostTicket',[basicAuth,advancedAuth.dailyEntryAuth],function(req,res){
	res.render('lowcostTicket.ejs',{user:req.session.user});
});
router.get('/insurancepolicy',[basicAuth,advancedAuth.dailyEntryAuth],function(req,res){
	res.render('insurancePolicy.ejs',{user:req.session.user});
});
router.get('/umrah',[basicAuth,advancedAuth.dailyEntryAuth],function(req,res){
	res.render('umrah.ejs',{user:req.session.user});
});
router.get('/hajj',[basicAuth,advancedAuth.dailyEntryAuth],function(req,res){
	res.render('hajj.ejs',{user:req.session.user});
});
router.get('/enteriortourism',[basicAuth,advancedAuth.dailyEntryAuth],function(req,res){
	res.render('enteriortourism.ejs',{user:req.session.user});
});



router.get('/employer',[basicAuth,advancedAuth.employersAuth],function(req,res){
	res.render('employer.ejs',{user:req.session.user});
});

router.get('/requests',[basicAuth,advancedAuth.acceptRequestsAuth],function(req,res,next){
	request.findAll({
		where:{status:"pending"},
		include:[
			{model:models.user,as:"employerUserAccount",foreignKey:"employerUserId"},
			{model:models.user,as:"auditorUserAccount",foreignKey:"auditorUserId"}
		]
	}).then((doc)=>{
			res.render("requests.ejs",{rows:doc,user:req.session.user});
		}).catch((err)=>{
			res.status(500).send(err);
		});
});

router.get('/request/:id',[basicAuth,advancedAuth.acceptRequestsAuth],function(req,res,next){
	request.findOne({
		where:{id:req.params.id},
		include:[
			{model:models.user,as:"employerUserAccount",foreignKey:"employerUserId"},
			{model:models.user,as:"auditorUserAccount",foreignKey:"auditorUserId"}
		]}).then((doc)=>{
		if(doc){
			res.render("request.ejs",{request:doc,user:req.session.user});
		}
		else{
			res.status(404).send("Request is not found!");
		}
	}).catch((err)=>{
		res.status(500).send(err);
	});
});





module.exports = router;
