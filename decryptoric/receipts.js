var models=require("../models");
module.exports={
  getPendingReceipts:async function(){
    var paymentReceipts=await models.paymentReceipt.findAll({where:{status:"pending"}});
    var receiveReceipts=await models.receiveReceipt.findAll({where:{status:"pending"}});
    for(var i=0;i<paymentReceipts.length;i++){
      paymentReceipts[i].dataValues.type="paymentReceipt";
    }
    for(var i=0;i<receiveReceipts.length;i++){
      receiveReceipts[i].dataValues.type="receiveReceipt";
    }
    var receipts=paymentReceipts.concat(receiveReceipts);
    return receipts;
  }

}
