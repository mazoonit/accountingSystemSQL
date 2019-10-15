'use strict';
module.exports = (sequelize, DataTypes) => {
  const paymentReceipt = sequelize.define('paymentReceipt', {
    userId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    currencyId: DataTypes.INTEGER,
    descriptionFromTo: DataTypes.STRING,
    description: DataTypes.STRING,
    exchangeRate:DataTypes.FLOAT,
    cashAccount: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'accepted')
  }, {});
  paymentReceipt.associate = function(models) {
    // associations can be defined here
    paymentReceipt.belongsTo(models.currency);
    paymentReceipt.belongsTo(models.account,{foreignKey:"accountId",as:"account"});
    paymentReceipt.belongsTo(models.account,{foreignKey:"cashAccount",as:"cashAcc"});
    paymentReceipt.belongsTo(models.user);
    paymentReceipt.hasMany(models.moveLine);
  };
  return paymentReceipt;
};
