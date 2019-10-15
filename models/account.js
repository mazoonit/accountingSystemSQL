'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    name: DataTypes.STRING,
    accountNature: DataTypes.ENUM('credit','debit'),
    type: DataTypes.ENUM('currentAssets', 'nonCurrentAssets', 'currentLiabilities', 'nonCurrentLiabilities','shareholdersEquity','revenues','expenses'),
    major: DataTypes.STRING,
    debit: DataTypes.FLOAT,
    credit: DataTypes.FLOAT,
    exchangeRate: DataTypes.FLOAT,
    currencyId: DataTypes.INTEGER,
    character: DataTypes.STRING
  }, {});
  account.associate = function(models) {
    // associations can be defined here
    account.hasMany(models.paymentReceipt,{foreignKey:'accountId'});
    account.hasMany(models.paymentReceipt,{foreignKey:'cashAccount'});
    account.hasMany(models.receiveReceipt,{foreignKey:'accountId'});
    account.hasMany(models.receiveReceipt,{foreignKey:'cashAccount'});
    account.hasMany(models.moveLine,{foreignKey:'accountId'});
    account.hasMany(models.productI,{foreignKey:'clientAccount',as:"clientAcc"});
    account.hasMany(models.productI,{foreignKey:'supplierAccount',as:"supplierAcc"});
    account.hasMany(models.productI,{foreignKey:'revenueAccount',as:"revenueAcc"});
    account.hasMany(models.productI,{foreignKey:'expenseAccount',as:"expenseAcc"});

  };
  return account;
};
