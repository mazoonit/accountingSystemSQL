'use strict';
module.exports = (sequelize, DataTypes) => {
  const employer = sequelize.define('employer', {
    name: DataTypes.STRING
  }, {});
  employer.associate = function(models) {
    // associations can be defined here
    employer.hasMany(models.productI,{foreignKey:'employerId'});

  };
  return employer;
};
