'use strict';
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define('client', {
    name: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {});
  client.associate = function(models) {
    // associations can be defined here
  };
  return client;
};