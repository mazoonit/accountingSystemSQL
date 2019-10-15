'use strict';
module.exports = (sequelize, DataTypes) => {
  const receiveReceipt = sequelize.define('receiveReceipt', {
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
  receiveReceipt.associate = function(models) {
    // associations can be defined here
    receiveReceipt.belongsTo(models.currency);
    receiveReceipt.belongsTo(models.account,{foreignKey:"accountId",as:"account"});
    receiveReceipt.belongsTo(models.account,{foreignKey:"cashAccount",as:"cashAcc"});
    receiveReceipt.belongsTo(models.user);
    receiveReceipt.hasMany(models.moveLine);
  };
  return receiveReceipt;
};
