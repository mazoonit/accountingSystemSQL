'use strict';
module.exports = (sequelize, DataTypes) => {
  const receipt = sequelize.define('receipt', {
    userId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    currencyId: DataTypes.INTEGER,
    descriptionFromTo: DataTypes.STRING,
    description: DataTypes.STRING,
    exchangeRate:DataTypes.FLOAT,
    cashAccount: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    type: DataTypes.ENUM('paymentReceipt', 'receiveReceipt'),
    status: DataTypes.ENUM('pending', 'accepted')
  }, {});
  receipt.associate = function(models) {
    // associations can be defined here
    receipt.belongsTo(models.currency);
    receipt.belongsTo(models.account,{foreignKey:"accountId",as:"account"});
    receipt.belongsTo(models.account,{foreignKey:"cashAccount",as:"cashAcc"});
    receipt.belongsTo(models.user);
    receipt.hasMany(models.moveLine);
  };
  return receipt;
};
