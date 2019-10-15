var models=require("../models");
var bcrypt = require('bcrypt');

module.exports={
  checkUniqueUserName:function(req,res,next){
    models.user.findOne({where:{username:req.body.username}}).then((userObj)=>{
      if(userObj){res.status(400).send("user name is duplicated!");}
      else{next();}
    }).catch(()=>{
      res.status(500).send("Internal server error,Try again.");
    });
  },
  getUsers:async function(){
    var users=await models.user.findAll({attributes:["id","username","permissions"]});
    return users;
  },
  createUser:async function(userObj){
    await models.user.create(userObj);
    return true;
  },
  updateUser:async function(userObj){
    var user=await models.user.findOne({where:{username:userObj.username}});
    if(user){
      await models.user.update(userObj,{where:{username:userObj.username}});
      return true;
    }
    else{
      return false;
    }
  },
  deleteUser:async function(username){
    await models.user.destroy({where:{username:username}});
    return true;
  },
  changePassword:async function(userObj){
    var user=await models.user.findOne({where:{username:userObj.username}});
    if(user){
      const salt=bcrypt.genSaltSync();
      var password=bcrypt.hashSync(userObj.password,salt);
      await models.user.update({password:password},{where:{username:userObj.username}});
      return true;
    }
    else{
      return false;
    }
  }
}
