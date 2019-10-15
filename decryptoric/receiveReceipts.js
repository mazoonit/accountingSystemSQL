var models=require("../models");
var preReceiveReceipt=require('./preReceiveReceipt.js');
var isValidInsert=preReceiveReceipt.isValidInsert;
var isValidUpdate=preReceiveReceipt.isValidUpdate;

module.exports={
  addReceipt:async function(receiptObj){
    let cashAccount=receiptObj.cashAccount;
    let isValid=await isValidInsert(cashAccount,receiptObj);
    if(isValid){
      var receiptCreated=await models.receiveReceipt.create(receiptObj);
      //to return it to the front-end in a decent(populated,included,complete) form .
      var receipt=await models.receiveReceipt.findOne({
        where:{id:receiptCreated.id},
        include:[
          {model:models.account,as:"cashAcc",foreignKey:"cashAccount"},
          {model:models.account,as:"account",foreignKey:"accountId"},
          {model:models.currency,as:"currency",foreignKey:"currencyId"},
          {model:models.user,as:"user",foreignKey:"userId"}
        ]
      });
      return receipt;
    }
    return false;
  },
  editReceipt:async function(receiptObj){
    let cashAccount=receiptObj.cashAccount;
    let isValid=await isValidUpdate(cashAccount,receiptObj,receiptObj.id);
    if(isValid==true){
      var updatedReceiptObj={
        amount:receiptObj.amount,
        description:receiptObj.description,
        descriptionFromTo:receiptObj.descriptionFromTo,
        exchangeRate:receiptObj.exchangeRate,
        userId:receiptObj.userId,
        accountId:receiptObj.accountId,
        currencyId:receiptObj.currencyId
      }
      await models.receiveReceipt.update(updatedReceiptObj,{where:{id:receiptObj.id}});
    }
    return isValid;
  },
  getReceipt:async function(id){
    let receiptObj=await models.receiveReceipt.findOne({
      where:{id:id},
      include:[
        {model:models.account,as:"cashAcc",foreignKey:"cashAccount"},
        {model:models.account,as:"account",foreignKey:"accountId"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.user,as:"user",foreignKey:"userId"}
      ]
    });
    return receiptObj;
  },
  getAllReceipts:async function(){
    let receiptObjs=await models.receiveReceipt.findAll();
    return receiptObjs;
  },
  deleteReceipt:async function(id,type){
    await models.receiveReceipt.destroy({
      where:{id:id,type:type}
    });
    return;
  }
  // getPendingReceipts:async function(){
  //   let receiptObjs=await models.receipt.findAll({
  //     where:{status:"pending"}
  //   });
  //   return receiptObjs;
  // }
}
