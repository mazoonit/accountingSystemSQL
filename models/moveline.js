'use strict';
module.exports = (sequelize, DataTypes) => {
  const moveLine = sequelize.define('moveLine', {
    moveId: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER,
    paymentReceiptId: DataTypes.INTEGER,
    receiveReceiptId:DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    debit: DataTypes.FLOAT,
    credit: DataTypes.FLOAT,
    exchangeRate: DataTypes.FLOAT,
    currencyId: DataTypes.INTEGER,
    notes: DataTypes.STRING
  }, {});
  moveLine.associate = function(models) {
    // associations can be defined here
    moveLine.belongsTo(models.currency);
    moveLine.belongsTo(models.account);
    moveLine.belongsTo(models.move);
    moveLine.belongsTo(models.invoice);
    moveLine.belongsTo(models.paymentReceipt);
    moveLine.belongsTo(models.receiveReceipt);

  };
  return moveLine;
};
