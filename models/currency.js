'use strict';
module.exports = (sequelize, DataTypes) => {
  const currency = sequelize.define('currency', {
    name: DataTypes.STRING,
    abb: DataTypes.STRING
  }, {});
  currency.associate = function(models) {
    // associations can be defined here
    currency.hasMany(models.moveLine,{foreignKey:'currencyId'});
    currency.hasMany(models.receipt,{foreignKey:'currencyId'});
    currency.hasMany(models.productI,{foreignKey:'currencyId'});
  };
  return currency;
};
