var models=require('../models');
var entries=require('./entries.js');
var Sequelize=require('sequelize');
const Op = Sequelize.Op;
module.exports={
  addProduct:async function(product){
    var entry={};
    entry.move={
      notes:product.productObj.description,
      userId:product.userId,
      createdAt:product.createdAt
    };
    entry.moveLines=[
      {
        debit:parseFloat(product.productObj.sellingPrice),
        credit:parseFloat(0),
        accountId:product.clientAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt
      },
      {
        debit:parseFloat(0),
        credit:parseFloat(product.productObj.sellingPrice),
        accountId:product.revenueAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt
      },
      {
        debit:parseFloat(product.productObj.total),
        credit:parseFloat(0),
        accountId:product.expenseAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt
    },
    {
        debit:parseFloat(0),
        credit:parseFloat(product.productObj.total),
        accountId:product.supplierAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt
      }];
    var entryOut=await entries.addEntry(entry);
    product.entryId=entryOut.move.id;
    product.productObj=JSON.stringify(product.productObj);
    var productOut=await models.productI.create(product);
    return productOut;
  },
  getProduct:async function(productId,type){
    var product=await models.productI.findOne({
      where:{id:productId,productType:type},
      include:[
        {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
        {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
        {model:models.account,as:"revenueAcc",foreignKey:"revenueAccount"},
        {model:models.account,as:"expenseAcc",foreignKey:"expenseAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return product;
  },
  deleteProduct:async function(productId,type){
    var product=await models.productI.findOne({where:{id:productId,productType:type}});
    if(product){
      await models.move.destroy({where:{id:product.entryId}});
      return true;
    }
    else{
      return false;

    }
  },
  getSupplierProducts:async function(supplierAccount,fromDate,toDate,productType){
    var products=await models.productI.findAll({
      where:{
        [Op.and]:[
          {supplierAccount:supplierAccount},
          {productType:productType},
          {createdAt: {
            [Op.gt]: new Date(fromDate),
            [Op.lt]: new Date(toDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
        {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
        {model:models.account,as:"revenueAcc",foreignKey:"revenueAccount"},
        {model:models.account,as:"expenseAcc",foreignKey:"expenseAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  },
  getEmployerProducts:async function(employerId,fromDate,toDate,productType){
    var products=await models.productI.findAll({
      where:{
        [Op.and]:[
          {employerId:employerId},
          {productType:productType},
          {createdAt: {
            [Op.gt]: new Date(fromDate),
            [Op.lt]: new Date(toDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
        {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
        {model:models.account,as:"revenueAcc",foreignKey:"revenueAccount"},
        {model:models.account,as:"expenseAcc",foreignKey:"expenseAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  },
  getAllProducts:async function(fromDate,toDate,productType){
    var products=await models.productI.findAll({
      where:{
        [Op.and]:[
          {productType:productType},
          {createdAt: {
            [Op.gt]: new Date(fromDate),
            [Op.lt]: new Date(toDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
        {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
        {model:models.account,as:"revenueAcc",foreignKey:"revenueAccount"},
        {model:models.account,as:"expenseAcc",foreignKey:"expenseAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  },
  getDelegateProducts:async function(delegateName,fromDate,toDate,productType){
    var products=await models.productI.findAll({
      where:{
        [Op.and]:[
          {delegateName:delegateName},
          {productType:productType},
          {createdAt: {
            [Op.gt]: new Date(fromDate),
            [Op.lt]: new Date(toDate)
          }}
        ]
      },
      include:[
        {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
        {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
        {model:models.account,as:"revenueAcc",foreignKey:"revenueAccount"},
        {model:models.account,as:"expenseAcc",foreignKey:"expenseAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  },
  getIslamicDateProducts:async function(islamicDate,productType){
    var products=await models.productI.findAll({
      where:{
        [Op.and]:[
          {islamicDate:islamicDate},
          {productType:productType}
        ]
      },
      include:[
        {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
        {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
        {model:models.account,as:"revenueAcc",foreignKey:"revenueAccount"},
        {model:models.account,as:"expenseAcc",foreignKey:"expenseAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  },
  getJourneyProducts:async function(journey,productType){
    var products=await models.productI.findAll({
      where:{
        [Op.and]:[
          {journey:journey},
          {productType:productType}
        ]
      },
      include:[
        {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
        {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
        {model:models.account,as:"revenueAcc",foreignKey:"revenueAccount"},
        {model:models.account,as:"expenseAcc",foreignKey:"expenseAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  },
  editProduct:async function(product){
    var productCheck=await models.productI.findOne({where:{id:product.id,productType:product.productType}});
    if(productCheck){
    var entry={};
    entry.move={
      notes:product.productObj.description,
      userId:product.userId,
      createdAt:product.createdAt,
      id:product.entryId
    };
    entry.moveLines=[
      {
        debit:parseFloat(product.productObj.sellingPrice),
        credit:parseFloat(0),
        accountId:product.clientAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt,
        moveId:product.entryId
      },
      {
        debit:parseFloat(0),
        credit:parseFloat(product.productObj.sellingPrice),
        accountId:product.revenueAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt,
        moveId:product.entryId
      },
      {
        debit:parseFloat(product.productObj.total),
        credit:parseFloat(0),
        accountId:product.expenseAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt,
        moveId:product.entryId
    },
    {
        debit:parseFloat(0),
        credit:parseFloat(product.productObj.total),
        accountId:product.supplierAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt,
        moveId:product.entryId
      }];


    await entries.editEntry(entry);
    product.productObj=JSON.stringify(product.productObj);
    await models.productI.update(product,{where:{id:product.id}});
    return true;
  }
  else{
    return false;
  }
},
getProductByMoveId:async function(moveId,productType){
  var product=await models.productI.findOne({
    where:{entryId:moveId,productType:productType},
    include:[
      {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
      {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
      {model:models.account,as:"revenueAcc",foreignKey:"revenueAccount"},
      {model:models.account,as:"expenseAcc",foreignKey:"expenseAccount"},
      {model:models.currency,as:"currency",foreignKey:"currencyId"},
      {model:models.employer,as:"employer",foreignKey:"employerId"}
    ]
  });
  return product;
}
}
