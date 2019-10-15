'use strict';
module.exports = (sequelize, DataTypes) => {
  const productI = sequelize.define('productI', {
    userId: DataTypes.INTEGER,
    clientAccount: DataTypes.INTEGER,
    supplierAccount: DataTypes.INTEGER,
    employerId: DataTypes.INTEGER,
    expenseAccount: DataTypes.INTEGER,
    revenueAccount: DataTypes.INTEGER,
    currencyId: DataTypes.INTEGER,
    exchangeRate: DataTypes.FLOAT,
    productObj: DataTypes.STRING,
    productType: DataTypes.STRING,
    delegateName: DataTypes.STRING,
    journey: DataTypes.STRING,
    islamicDate: DataTypes.STRING,
    entryId: DataTypes.INTEGER
  }, {});
  productI.associate = function(models) {
    // associations can be defined here
    productI.belongsTo(models.account,{foreignKey:"clientAccount",as:"clientAcc"});
    productI.belongsTo(models.account,{foreignKey:"supplierAccount",as:"supplierAcc"});
    productI.belongsTo(models.account,{foreignKey:"expenseAccount",as:"expenseAcc"});
    productI.belongsTo(models.account,{foreignKey:"revenueAccount",as:"revenueAcc"});
    productI.belongsTo(models.currency,{foreignKey:"currencyId"});
    productI.belongsTo(models.employer,{foreignKey:"employerId"});
    productI.belongsTo(models.user,{foreignKey:"userId"});
    productI.belongsTo(models.move,{foreignKey:"entryId"});

  };
  return productI;
};
