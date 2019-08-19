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
    account.hasMany(models.receipt,{foreignKey:'accountId'});
    account.hasMany(models.receipt,{foreignKey:'cashAccount'});
    account.hasMany(models.moveLine,{foreignKey:'accountId'});
    account.hasMany(models.productI,{foreignKey:'clientAccount'});
    account.hasMany(models.productI,{foreignKey:'supplierAccount'});
    account.hasMany(models.productI,{foreignKey:'revenueAccount'});
    account.hasMany(models.productI,{foreignKey:'expenseAccount'});

  };
  return account;
};
