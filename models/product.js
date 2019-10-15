'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    employerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    supplierAccount: DataTypes.INTEGER,
    clientAccount: DataTypes.INTEGER,
    profitAccount: DataTypes.INTEGER,
    currencyId: DataTypes.INTEGER,
    exchangeRate: DataTypes.FLOAT,
    productObj: DataTypes.STRING,
    productType: DataTypes.STRING,
    entryId: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.belongsTo(models.account,{foreignKey:"clientAccount",as:"clientAcc"});
    product.belongsTo(models.account,{foreignKey:"supplierAccount",as:"supplierAcc"});
    product.belongsTo(models.account,{foreignKey:"profitAccount",as:"profitAcc"});
    product.belongsTo(models.currency,{foreignKey:"currencyId"});
    product.belongsTo(models.employer,{foreignKey:"employerId"});
    product.belongsTo(models.user,{foreignKey:"userId"});
    product.belongsTo(models.move,{foreignKey:"entryId"});

  };
  return product;
};
