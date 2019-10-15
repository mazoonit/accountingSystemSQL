'use strict';
module.exports = (sequelize, DataTypes) => {
  const currency = sequelize.define('currency', {
    name: DataTypes.STRING,
    abb: DataTypes.STRING
  }, {});
  currency.associate = function(models) {
    // associations can be defined here
    currency.hasMany(models.moveLine,{foreignKey:'currencyId'});
    currency.hasMany(models.paymentReceipt,{foreignKey:'currencyId'});
    currency.hasMany(models.receiveReceipt,{foreignKey:'currencyId'});
    currency.hasMany(models.productI,{foreignKey:'currencyId'});
  };
  return currency;
};
