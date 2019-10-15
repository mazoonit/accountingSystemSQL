var models=require('../models');
async function isValidRequestEdit(requestObj,user){
  var theRequest=await models.request.findOne({
    where:{
      id:requestObj.id,
      type:requestObj.type,
      employerUserId:user,
      status:"pending"
    }
  });
  if(theRequest){
    return true;
  }
  else{
    return false;
  }
}
module.exports={
  acceptRequest:async function(id,type,auditorUserId){
    await models.request.update({status:"accepted",auditorUserId:auditorUserId},{where:{id:id,type:type}});
    return true;
  },
  addRequest:async function(requestObj){
    var createdRequest=await models.request.create(requestObj);
    var requestIncluded=await models.request.findOne({where:{id:createdRequest.id}});
    return requestIncluded;
  },
  edit:async function(requestObj,user){
    var validFlag=await isValidRequestEdit(requestObj,user);
    if(validFlag==true){
      requestObj.requestBody=JSON.stringify(requestObj.requestBody);
      await models.request.update(requestObj,{where:{id:requestObj.id,type:requestObj.type}});
    }
    return validFlag;
  }
}
