var models=require("../models");
var prereceipt=require('./prereceipt.js');
var isValidInsert=prereceipt.isValidInsert;
var isValidUpdate=prereceipt.isValidUpdate;

module.exports={
  addReceipt:async function(receiptObj){
    let cashAccount=receiptObj.cashAccount;
    let isValid=await isValidInsert(cashAccount,receiptObj);
    if(isValid){
      var receiptCreated=await models.receipt.create(receiptObj);
      var receipt=await models.receipt.findOne({
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
  editReceipt:async function(receiptObj,type){
    let cashAccount=receiptObj.cashAccount;
    let isValid=await isValidUpdate(cashAccount,receiptObj,receiptObj.id,type);
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
      await models.receipt.update(updatedReceiptObj,{where:{id:receiptObj.id,type:receiptObj.type}});
    }
    return isValid;
  },
  getReceipt:async function(id,type){
    let receiptObj=await models.receipt.findOne({
      where:{id:id,type:type},
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
    let receiptObjs=await models.receipt.findAll();
    return receiptObjs;
  },
  deleteReceipt:async function(id,type){
    await models.receipt.destroy({
      where:{id:id,type:type}
    });
    return;
  },
  getPendingReceipts:async function(){
    let receiptObjs=await models.receipt.findAll({
      where:{status:"pending"}
    });
    return receiptObjs;
  }
}
