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
        credit:parseFloat(product.productObj.total),
        accountId:product.supplierAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt
      },
      {
        debit:parseFloat(0),
        credit:parseFloat(product.productObj.profit),
        accountId:product.profitAccount,
        notes:product.productObj.description,
        currencyId:product.currencyId,
        exchangeRate:product.exchangeRate,
        createdAt:product.createdAt
      }];
    var entryOut=await entries.addEntry(entry);
    product.entryId=entryOut.move.id;
    product.productObj=JSON.stringify(product.productObj);
    var productOut=await models.product.create(product);
    return productOut;
  },
  getProduct:async function(productd,type){
    var product=await models.product.findOne({
      where:{id:productd,productType:type},
      include:[
        {model:models.account,as:"clientAcc",foreignKey:"clientAccount"},
        {model:models.account,as:"supplierAcc",foreignKey:"supplierAccount"},
        {model:models.account,as:"profitAcc",foreignKey:"profitAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return product;
  },
  deleteProduct:async function(productId,type){
    var product=await models.product.findOne({where:{id:productId,productType:type}});
    if(product){
      await models.move.destroy({where:{id:product.entryId}});
      return true;
    }
    else{
      return false;

    }
  },
  getSupplierProducts:async function(supplierAccount,fromDate,toDate,productType){
    var products=await models.product.findAll({
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
        {model:models.account,as:"profitAcc",foreignKey:"profitAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  },
  getEmployerProducts:async function(employerId,fromDate,toDate,productType){
    var products=await models.product.findAll({
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
        {model:models.account,as:"profitAcc",foreignKey:"profitAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  },
  getAllProducts:async function(fromDate,toDate,productType){
    var products=await models.product.findAll({
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
        {model:models.account,as:"profitAcc",foreignKey:"profitAccount"},
        {model:models.currency,as:"currency",foreignKey:"currencyId"},
        {model:models.employer,as:"employer",foreignKey:"employerId"}
      ]
    });
    return products;
  }
}
