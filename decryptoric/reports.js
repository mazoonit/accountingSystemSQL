var models=require('../models');
var Sequelize=require('sequelize');
const Op = Sequelize.Op;
module.exports={
  getAccountStatment:async function(accountId,fromDate,toDate){
    var beginingCredit=0;
    var beginingDebit=0;
    var accountRaw=await models.account.findOne({where:{id:accountId}});
    var oldMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {accountId:accountId},
          {createdAt: {
            [Op.lt]: new Date(fromDate)
          }}
        ]
      }});
    beginingDebit+=accountRaw.debit*accountRaw.exchangeRate;
    beginingCredit+=accountRaw.credit*accountRaw.exchangeRate;

    for(var i=0;i<oldMoves.length;i++){
      beginingDebit+=oldMoves[i].debit*oldMoves[i].exchangeRate;
      beginingCredit+=oldMoves[i].credit*oldMoves[i].exchangeRate;
    }
    var newMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {accountId:accountId},
          {createdAt:{
            [Op.gt]:new Date(fromDate),
            [Op.lt]:new Date(toDate)
          }
          }
        ]
      },
      include:[
        {model:models.account,as:"account"},
        {model:models.currency,as:"currency"},
        {model:models.move,as:"move"},
        {model:models.receipt,as:"receipt",foreignKey:"receiptId"}

      ]
    });
    var returnObj={
      moves:newMoves,
      beginingDebit:beginingDebit,
      beginingCredit:beginingCredit,
      account:accountRaw
    }
    return returnObj;
  },
  getCurrencyAccountStatment:async function(accountId,currencyId,fromDate,toDate){
    var beginingCredit=0;
    var beginingDebit=0;
    var accountRaw=await models.account.findOne({where:{id:accountId}});
    var oldMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {accountId:accountId},
          {currencyId:currencyId},
          {createdAt: {
            [Op.lt]: new Date(fromDate)
          }}
        ]
      }});
    beginingDebit+=accountRaw.debit*accountRaw.exchangeRate;
    beginingCredit+=accountRaw.credit*accountRaw.exchangeRate;

    for(var i=0;i<oldMoves.length;i++){
      beginingDebit+=oldMoves[i].debit*oldMoves[i].exchangeRate;
      beginingCredit+=oldMoves[i].credit*oldMoves[i].exchangeRate;
    }
    var newMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {accountId:accountId},
          {currencyId:currencyId},
          {createdAt:{
            [Op.gt]:new Date(fromDate),
            [Op.lt]:new Date(toDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"account"},
        {model:models.currency,as:"currency"},
        {model:models.move,as:"move"},
        {model:models.receipt,as:"receipt",foreignKey:"receiptId"}
      ]
    });
    var returnObj={
      moves:newMoves,
      beginingDebit:beginingDebit,
      beginingCredit:beginingCredit,
      account:accountRaw
    }
    return returnObj;
  },




  getCashCover:async function(cashAccount,date){
    var oldReceipts=await models.receipt.findAll({
      where:{
        [Op.and]:[
          {createdAt:{
            [Op.lt]:new Date(date)
          }},
          {cashAccount:cashAccount}
        ]
      }
    });

    var debit=0;
    var credit=0;
    for(var i=0;i<oldReceipts.length;i++){
      if(oldReceipts[i].type=="paymentReceipt"){
        credit+=(oldReceipts[i].amount*oldReceipts[i].exchangeRate);
      }
      else{
        debit+=(oldReceipts[i].amount*oldReceipts[i].exchangeRate);
      }
    }
    var start = new Date(date);
    start.setHours(0,0,0,0);
    var end = new Date(date);
    end.setHours(23,59,59,999);
    var dateReceipts=await models.receipt.findAll({
      where:{
        [Op.and]:[
          {createdAt:{
            [Op.lt]:new Date(end),
            [Op.gt]:new Date(start)
          }},
          {cashAccount:cashAccount}
        ]
      }
    });

    var cashCoverData={
      receipts:dateReceipts,
      debit:debit,
      credit:credit
    };
    return cashCoverData;
  },




  getCharactersticReport:async function(character,fromDate,toDate){
    var accountRaws=await models.account.findAll({where:{character:character}});
    var accounts={};
    for(var i=0;i<accountRaws.length;i++){
      var id=accountRaws[i].id;
      if(!accounts[id]){
        accounts[id]={
          credit:accountRaws[i].credit*accountRaws[i].exchangeRate,
          debit:accountRaws[i].debit*accountRaws[i].exchangeRate,
          account:accountRaws[i]
        }
      }
    }

    var oldMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {'$account.character$':character},
          {createdAt:{
            [Op.lt]:new Date(fromDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"account"}
      ]
    });
    var newMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {'$account.character$':character},
          {createdAt:{
            [Op.gt]:new Date(fromDate),
            [Op.lt]:new Date(toDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"account"}
      ]
    });
    for(var i=0;i<oldMoves.length;i++){
      var id=oldMoves[i].account.id;
      accounts[id].credit+=oldMoves[i].credit*oldMoves[i].exchangeRate;
      accounts[id].debit+=oldMoves[i].debit*oldMoves[i].exchangeRate;
    }
    for(var i=0;i<newMoves.length;i++){
      var id=newMoves[i].account.id;
      accounts[id].credit+=newMoves[i].credit*newMoves[i].exchangeRate;
      accounts[id].debit+=newMoves[i].debit*newMoves[i].exchangeRate;
    }
    return accounts;
  },
  getCharactersticMovesReport:async function(character,fromDate,toDate){
    var beginingDebit=0;
    var beginingCredit=0;
    var accountRaws=await models.account.findAll({where:{character:character}});
    for(var i=0;i<accountRaws.length;i++){
      beginingCredit+=accountRaws[i].credit*accountRaws[i].exchangeRate;
      beginingDebit+=accountRaws[i].debit*accountRaws[i].exchangeRate;
    }
    var oldMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {'$account.character$':character},
          {createdAt:{
            [Op.lt]:new Date(fromDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"account"}
      ]
    });
    var newMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {'$account.character$':character},
          {createdAt:{
            [Op.gt]:new Date(fromDate),
            [Op.lt]:new Date(toDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"account"},
        {model:models.currency,as:"currency"},
        {model:models.move,as:"move"},
        {model:models.receipt,as:"receipt",foreignKey:"receiptId"}
      ]

    });
    for(var i=0;i<oldMoves.length;i++){
      beginingDebit+=oldMoves[i].debit*oldMoves[i].exchangeRate;
      beginingCredit+=oldMoves[i].credit*oldMoves[i].exchangeRate;
    }
    var returnObj={
      beginingDebit:beginingDebit,
      beginingCredit:beginingCredit,
      moves:newMoves
    }
    return returnObj;
  },
  getGeneralLedgerReport:async function(major,fromDate,toDate){
    var accountRaws=await models.account.findAll({where:{major:major}});
    var accounts={};
    for(var i=0;i<accountRaws.length;i++){
      var id=accountRaws[i].id;
      if(!accounts[id]){
        accounts[id]={
          credit:accountRaws[i].credit*accountRaws[i].exchangeRate,
          debit:accountRaws[i].debit*accountRaws[i].exchangeRate,
          account:accountRaws[i]
        }
      }
    }

    var oldMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {'$account.major$':major},
          {createdAt:{
            [Op.lt]:new Date(fromDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"account"}
      ]
    });
    var newMoves=await models.moveLine.findAll({
      where:{
        [Op.and]:[
          {'$account.major$':major},
          {createdAt:{
            [Op.gt]:new Date(fromDate),
            [Op.lt]:new Date(toDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"account"}
      ]
    });
    for(var i=0;i<oldMoves.length;i++){
      var id=oldMoves[i].account.id;
      accounts[id].credit+=oldMoves[i].credit*oldMoves[i].exchangeRate;
      accounts[id].debit+=oldMoves[i].debit*oldMoves[i].exchangeRate;
    }
    for(var i=0;i<newMoves.length;i++){
      var id=newMoves[i].account.id;
      accounts[id].credit+=newMoves[i].credit*newMoves[i].exchangeRate;
      accounts[id].debit+=newMoves[i].debit*newMoves[i].exchangeRate;
    }
    return accounts;
  },
  getBalances:async function(date){
    var allAccounts=await models.account.findAll();
    var majorAccounts={};
    for(var i=0;i<allAccounts.length;i++){
      var accountMajor=allAccounts[i].major;
      var debit=allAccounts[i].debit*allAccounts[i].exchangeRate;
      var credit=allAccounts[i].credit*allAccounts[i].exchangeRate;
      if(majorAccounts[accountMajor]){
        majorAccounts[accountMajor].debit+=debit;
        majorAccounts[accountMajor].credit+=credit;
         majorAccounts[accountMajor].accounts.push(allAccounts[i]);
      }
      else{
        majorAccounts[accountMajor]={
          name:accountMajor,
          nature:allAccounts[i].accountNature,
          type:allAccounts[i].type,
          debit:debit,
          credit:credit,
          accounts:[]
        };
        majorAccounts[accountMajor].accounts.push(allAccounts[i]);
      }
    }
    var moves=await models.moveLine.findAll({
      where:{
          createdAt:{
            [Op.lt]:new Date(date)
          }
      },
      include:[
        {model:models.account,as:"account"}
      ]
    });
    for(var i=0;i<moves.length;i++){
      var moveAccountMajor=moves[i].account.major;
      var credit=moves[i].credit*moves[i].exchangeRate;
      var debit=moves[i].debit*moves[i].exchangeRate;
      majorAccounts[moveAccountMajor].credit+=credit;
      majorAccounts[moveAccountMajor].debit+=debit;
    }
    return majorAccounts;
  }
}
