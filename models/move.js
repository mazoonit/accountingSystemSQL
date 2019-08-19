'use strict';
module.exports = (sequelize, DataTypes) => {
  const move = sequelize.define('move', {
    notes: DataTypes.STRING,
    userId:DataTypes.INTEGER
  }, {});
  move.associate = function(models) {
    // associations can be defined here
    move.hasMany(models.moveLine,{foreignKey:'moveId'});
    move.belongsTo(models.user,{foreignKey:'userId'});

  };
  return move;
};
