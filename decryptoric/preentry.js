var models=require('../models');
module.exports={
  entryValidation:function(entry){
    return new Promise((resolve,reject)=>{
      if(!entry.move.notes){
        reject("Entry notes is required!");
      }
      else if(!entry.move.userId){
        reject("Entry User ID is required!");
      }
      else{
        var debit=0;
        var credit=0;
        for(var i=0;i<entry.moveLines.length;i++){
          if(!entry.moveLines[i].notes){
            reject("Move notes is required!");
          }
          else if(isNaN(entry.moveLines[i].exchangeRate)){
            reject("Move exchange rate is required to be a number");
          }
          else if(isNaN(entry.moveLines[i].debit)){
            reject("Move debit is required to be number!");
          }
          else if(isNaN(entry.moveLines[i].credit)){
            reject("Move credit is required to be a number!");
          }
          else if(!entry.moveLines[i].currencyId){
            reject("Move currency ID is required!");
          }
          else if(!entry.moveLines[i].accountId){
            reject("Move account ID is required!");
          }
          else{
            debit+=parseFloat(entry.moveLines[i].debit*entry.moveLines[i].exchangeRate);
            credit+=parseFloat(entry.moveLines[i].credit*entry.moveLines[i].exchangeRate);
          }
        }
        if(credit==debit){
          resolve();}
        else{
          reject("Move is not balanced!")
        }
      }
    });
  },
  acceptReceipts:function(moveLines){
    return new Promise((resolve,reject)=>{
      var promises=[];
      for(var i=0;i<moveLines.length;i++){
        if(moveLines[i].receiptId){
            promises.push(models.receipt.update({status:"accepted"},{where:{id:moveLines[i].receiptId}}));
        }
      }
      Promise.all(promises).then(()=>{
        resolve();
      }).catch((errors)=>{
        console.log(errors);
        reject();
      });
    });
  }


}
