'use strict';
module.exports = (sequelize, DataTypes) => {
  const invoice = sequelize.define('invoice', {
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    clientId: DataTypes.INTEGER
  }, {});
  invoice.associate = function(models) {
    // associations can be defined here
      invoice.hasMany(models.moveLine,{foreignKey:'invoiceId'});
      invoice.belongsTo(models.user);
      invoice.belongsTo(models.client);
  };
  return invoice;
};
