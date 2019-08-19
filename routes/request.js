var express = require('express');
var router = express.Router();
var models = require("../models");
var request=models.request;
const cookieSession=require('cookie-session');
var requests = require("../decryptoric/requests.js");

router.get('/:id',function(req,res,next){
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

/*
 * INSERT
 */

router.post('/',function(req,res,next){
	var requestObj=req.body;
	requestObj.employerUserId=req.session.user.id;
	requestObj.requestBody=JSON.stringify(requestObj.requestBody);
	requests.addRequest(requestObj).then((requestRaw)=>{
		res.status(200).send(requestRaw);
	}).catch((error)=>{
		res.status(500).send(error);
	})
});

//accept request
router.post('/accept',function(req,res,next){
  var auditorUserId=req.session.user._id;
  var id=req.body.id;
	var type=req.body.type;
  requests.accept(id,type,auditorUserId);
});

/*
 * UPDATE
 */

router.post('/update',function(req,res,next){
	// request.findOne({betterId:req.body.betterId},function(err,doc){
	// 	if(err){
	// 		var error=new Error(err);
	// 		error.status=500;
	// 		next(error);
	// 	}
	// 	else if(!doc){
	// 		var error=new Error("Request Not Found!");
	// 		error.status=404;
	// 		next(error);
	// 	}
	// 	else{
	// 		if(doc.type==req.body.type){
	// 		doc.requestBody = req.body.requestBody ? JSON.stringify(req.body.requestBody) : doc.requestBody;
	// 		doc.save(function(err,savedDoc){
	// 			if(err){
	// 				var error=new Error(err);
	// 				error.status=500;
	// 				next(error);
	// 			}
	// 			else{
	// 				res.status(200).send("Request has  been updated successfully!");
	// 			}
	// 		});
	// 		}
	// 		else{
	// 			var error=new Error("Request Not Found!");
	// 			error.status=404;
	// 			next(error);
	//
	// 		}
	// 	}
	// });
	//


});

/*
 * DELETE
 */
router.delete('/',function(req,res,next){
	var id=req.body.id;
	var type=req.body.type;
	request.destroy({where:{id:id,type:type}}).then(()=>{
		res.status(200).send("Request has been deleted successfully!");
	}).catch((error)=>{
		res.status(500).send(error);
	});
});


router.post('/frontGet',function(req,res,next){
	var id=req.body.id;
	var type=req.body.type;
	request.findOne({
		where:{id:id,type:type},
		include:[
			{model:models.user,as:"employerUserAccount",foreignKey:"employerUserId"},
			{model:models.user,as:"auditorUserAccount",foreignKey:"auditorUserId"}
		]}).then((requestRaw)=>{
			if(requestRaw){
				res.status(200).send(requestRaw);
			}
			else{
				res.status(404).send("Request is not found!");
			}
	}).catch((error)=>{
		res.status(500).send(error);
	})
});
module.exports = router;
