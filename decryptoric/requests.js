var models=require('../models');
module.exports={
  acceptRequest:async function(id,type,auditorUserId){
    await models.receipt.update({status:"accepted",auditorUserId:auditorUserId},{where:{id:id,type:type}});
    return true;
  },
  addRequest:async function(requestObj){
    var createdRequest=await models.request.create(requestObj);
    var requestIncluded=await models.request.findOne({where:{id:createdRequest.id}});
    return requestIncluded;
  }
}
