var models=require("../models");
var receipt=models.receipt;


async function getCashAccountBalance(cashAccount){
  let cashAccountObj=await models.account.findOne({where:{id:cashAccount}});
  if(cashAccountObj){
    let receiptRaws=await receipt.findAll({where:{cashAccount:cashAccount}});
    var accExchangeRate=cashAccountObj.exchangeRate;
    var debit=cashAccountObj.debit*accExchangeRate;
    var credit=cashAccountObj.credit*accExchangeRate;
    for(var i=0;i<receiptRaws.length;i++){
      var receiptAmount=receiptRaws[i].amount*receiptRaws[i].exchangeRate;
      if(receiptRaws[i].type=='paymentReceipt'){
        credit+=receiptAmount;
      }
      if(receiptRaws[i].type=='receiveReceipt'){
        debit+=receiptAmount;
      }
    }
    var accBalance={debit:debit,credit:credit};
    return accBalance;
  }
  else{
    return Promise.reject("There's no such cash account!");
  }
}
module.exports={
  isValidInsert:async function(cashAccount,newReceipt){
    if(newReceipt.type=="receiveReceipt"){
      return true;
    }
    else{
      let accBalance=await getCashAccountBalance(cashAccount);
      let receiptAmountCredit=newReceipt.amount*newReceipt.exchangeRate;
      console.log(accBalance);
      if(accBalance.debit<accBalance.credit+receiptAmountCredit){
        return false;
      }
      else{return true;}
    }
  },
  isValidUpdate:async function(cashAccount,newReceipt,receiptId,type){
    let oldReceipt=await receipt.findOne({where:{id:receiptId}});
    if(oldReceipt.type==type){
      if(oldReceipt.type=="receiveReceipt"){
        return true;
      }
      else{
        let accBalance=await getCashAccountBalance(cashAccount);
        let newReceiptAmountCredit=newReceipt.amount*newReceipt.exchangeRate;
        let oldReceiptAmountCredit=oldReceipt.amount*oldReceipt.exchangeRate;
        console.log(newReceiptAmountCredit);
        console.log(oldReceiptAmountCredit);
        if(accBalance.debit<accBalance.credit+newReceiptAmountCredit-oldReceiptAmountCredit){
          return false;
        }
        else{return true;}
      }
  }
  else{
    return false;
  }
}
}
