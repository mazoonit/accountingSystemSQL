const express = require('express');
var router = express.Router();
const models = require('../models');
var auth=require('../decryptoric/auth.js');
var basicAuth=auth.basicAuth;
var user=models.user;
var bcrypt = require('bcrypt');

router.get('/',basicAuth,function(req,res){
	res.render('home.ejs',{user:req.session.user});
});
router.get('/login',function(req,res){
	if(req.session.user){
		res.redirect('/');
	}
	else{
		res.render('login.ejs');
	}
});

router.post('/login',function(req,res,next){
	user.findOne({ where:{username:req.body.username,active:1}}).then(function(userDoc){
		if (!userDoc) {
			var error=new Error("Invalid Username or Password!");
			error.status=401;
			next(error);
		}
		else if (!userDoc.validPassword(req.body.password)){
			var error=new Error("Invalid Username or Password!");
			error.status=401;
			next(error);
		}
		else{
      req.session.user=userDoc;
      res.status(200).send(true);
		}
	});
});

router.get('/logout',function(req,res){
	if (req.session) {
	    // delete session object
		req.session=null;
		res.redirect('/');
  	}
});

module.exports = router;
