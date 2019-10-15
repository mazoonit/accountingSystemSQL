var express = require('express');
var router = express.Router();
var models = require("../models");
var request=models.request;
const cookieSession=require('cookie-session');
var requests = require("../decryptoric/requests.js");


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
  var auditorUserId=req.session.user.id;
  var id=req.body.id;
	var type=req.body.type;
  requests.acceptRequest(id,type,auditorUserId).then(()=>{
		res.status(200).send("Request has been accepted successfully!");
	}).catch((err)=>{
		res.status(500).send(err);
	})
});

/*
 * UPDATE
 */

router.put('/',function(req,res,next){
	var user=req.session.user.id;
	var requestObj=req.body;
	requests.edit(requestObj,user).then((flag)=>{
		if(flag){
      res.status(200).send(flag);
    }
    else{
      res.status(400).send(flag);
    }
	}).catch((err)=>{
		res.status(500).send(err);
	})
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
