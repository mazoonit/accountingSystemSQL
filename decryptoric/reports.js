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
        {model:models.paymentReceipt,as:"paymentReceipt",foreignKey:"paymentReceiptId"},
        {model:models.receiveReceipt,as:"receiveReceipt",foreignKey:"receiveReceiptId"}

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
        {model:models.paymentReceipt,as:"paymentReceipt",foreignKey:"paymentReceiptId"},
        {model:models.receiveReceipt,as:"receiveReceipt",foreignKey:"receiveReceiptId"}
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
    var cashAccountRaw=await models.account.findOne({
      where:{id:cashAccount}
    });
    var oldPaymentReceipts=await models.paymentReceipt.findAll({
      where:{
        [Op.and]:[
          {createdAt:{
            [Op.lt]:new Date(date)
          }},
          {cashAccount:cashAccount}
        ]
      }
    });
    var oldReceiveReceipts=await models.receiveReceipt.findAll({
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
    for(var i=0;i<oldPaymentReceipts.length;i++){
      credit+=(oldPaymentReceipts[i].amount*oldPaymentReceipts[i].exchangeRate);
    }
    for(var i=0;i<oldReceiveReceipts.length;i++){
      debit+=(oldReceiveReceipts[i].amount*oldReceiveReceipts[i].exchangeRate);
    }
    credit+=cashAccountRaw.credit*cashAccountRaw.exchangeRate;
    debit+=cashAccountRaw.debit*cashAccountRaw.exchangeRate;

    var start = new Date(date);
    start.setHours(0,0,0,0);
    var end = new Date(date);
    end.setHours(23,59,59,999);
    var datePaymentReceipts=await models.paymentReceipt.findAll({
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
    var dateReceiveReceipts=await models.receiveReceipt.findAll({
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
    for(var i=0;i<dateReceiveReceipts.length;i++){
      dateReceiveReceipts[i].dataValues.type="receiveReceipt";
    }
    for(var i=0;i<datePaymentReceipts.length;i++){
      datePaymentReceipts[i].dataValues.type="paymentReceipt";
    }
    var dateReceipts=datePaymentReceipts.concat(dateReceiveReceipts);
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
        {model:models.paymentReceipt,as:"paymentReceipt",foreignKey:"paymentReceiptId"},
        {model:models.receiveReceipt,as:"receiveReceipt",foreignKey:"receiveReceiptId"}
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
          account:accountRaws[i],
          beginingDebit:accountRaws[i].debit*accountRaws[i].exchangeRate,
          beginingCredit:accountRaws[i].credit*accountRaws[i].exchangeRate,
          newMovesCredit:0,
          newMovesDebit:0
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
      accounts[id].beginingCredit+=oldMoves[i].credit*oldMoves[i].exchangeRate;
      accounts[id].beginingDebit+=oldMoves[i].debit*oldMoves[i].exchangeRate;


    }
    for(var i=0;i<newMoves.length;i++){
      var id=newMoves[i].account.id;
      accounts[id].credit+=newMoves[i].credit*newMoves[i].exchangeRate;
      accounts[id].debit+=newMoves[i].debit*newMoves[i].exchangeRate;
      accounts[id].newMovesCredit+=newMoves[i].credit*newMoves[i].exchangeRate;
      accounts[id].newMovesDebit+=newMoves[i].debit*newMoves[i].exchangeRate;
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
  },
  getISBalances:async function(fromDate,toDate){
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
            [Op.gt]:new Date(fromDate),
            [Op.lt]:new Date(toDate)
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
  },
  getTrialBalanceBalances:async function(fromDate,toDate){
    var allAccounts=await models.account.findAll();
    var majorAccounts={};
    for(var i=0;i<allAccounts.length;i++){
      var accountMajor=allAccounts[i].major;
      var debit=allAccounts[i].debit*allAccounts[i].exchangeRate;
      var credit=allAccounts[i].credit*allAccounts[i].exchangeRate;
      if(majorAccounts[accountMajor]){
        // majorAccounts[accountMajor].debit+=debit;
        // majorAccounts[accountMajor].credit+=credit;
        majorAccounts[accountMajor].beginingDebit+=debit;
        majorAccounts[accountMajor].beginingCredit+=credit;
        majorAccounts[accountMajor].accounts.push(allAccounts[i]);
      }
      else{
        majorAccounts[accountMajor]={
          name:accountMajor,
          nature:allAccounts[i].accountNature,
          type:allAccounts[i].type,
          debit:0,
          credit:0,
          beginingDebit:debit,
          beginingCredit:credit,
          accounts:[]
        };
        majorAccounts[accountMajor].accounts.push(allAccounts[i]);
      }
    }
    var moves=await models.moveLine.findAll({
      where:{
          createdAt:{
            [Op.gt]:new Date(fromDate),
            [Op.lte]:new Date(toDate)
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
//oldmoves
    var oldMoves=await models.moveLine.findAll({
      where:{
          createdAt:{
            [Op.gt]:new Date('1-1-1998'),
            [Op.lte]:new Date(fromDate)
          }
      },
      include:[
        {model:models.account,as:"account"}
      ]
    });
    for(var i=0;i<oldMoves.length;i++){
      var moveAccountMajor=oldMoves[i].account.major;
      var credit=oldMoves[i].credit*oldMoves[i].exchangeRate;
      var debit=oldMoves[i].debit*oldMoves[i].exchangeRate;
      majorAccounts[moveAccountMajor].beginingCredit+=credit;
      majorAccounts[moveAccountMajor].beginingDebit+=debit;
    }
    return majorAccounts;
  },
  getReceiptsReport:async function(fromDate,toDate){
    var receiveReceipts=await models.receiveReceipt.findAll({where:{
      createdAt:{
        [Op.gte]:new Date(fromDate),
        [Op.lte]:new Date(toDate)
      }
    }});
    var paymentReceipts=await models.paymentReceipt.findAll({where:{
      createdAt:{
        [Op.gte]:new Date(fromDate),
        [Op.lte]:new Date(toDate)
      }
    }});
    var returnedObj={
      receiveReceipts:receiveReceipts,
      paymentReceipts:paymentReceipts
    }
    return returnedObj;
  }

}
