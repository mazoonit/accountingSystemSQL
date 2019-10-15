'use strict';
var bcrypt=require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password:DataTypes.STRING,
    permissions: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    hooks:{
      beforeCreate:(userObj)=>{
        const salt=bcrypt.genSaltSync();
        userObj.password=bcrypt.hashSync(userObj.password,salt);
      }
    }
  });
  user.prototype.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
  }
  user.associate = function(models) {
  // associations can be defined here
  user.hasMany(models.invoice,{foreignKey:'userId'});
  user.hasMany(models.invoice,{foreignKey:'userId'});
  user.hasMany(models.paymentReceipt,{foreignKey:'userId'});
  user.hasMany(models.receiveReceipt,{foreignKey:'userId'});

  user.hasMany(models.productI,{foreignKey:'userId'});

};
  return user;
};
