'use strict';
module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define('request', {
    status: DataTypes.ENUM('pending', 'accepted'),
    employerUserId: DataTypes.INTEGER,
    type: DataTypes.ENUM('payment', 'receive', 'invoice'),
    requestBody: DataTypes.STRING,
    auditorUserId: DataTypes.INTEGER
  }, {});
  request.associate = function(models) {
    // associations can be defined here
    request.belongsTo(models.user,{foreignKey:"employerUserId",as:"employerUserAccount"});
    request.belongsTo(models.user,{foreignKey:"auditorUserId",as:"auditorUserAccount"});
  };
  return request;
};
