var models=require('../models');
var preentry=require('./preentry.js');
var entryValidation=preentry.entryValidation;


/*
Possible errors ->
  1-accountId,currencyId of moveLine are not checked if in db or not.
  2-userId of move are not chekced if in db or not
*/


module.exports={
  addEntry:function(entry){
    return new Promise((resolve,reject)=>{
      entryValidation(entry).then(()=>{
        var move=entry.move;
        var moveLines=entry.moveLines;
        models.move.create(move).then((moveRaw)=>{
          for(var k=0;k<moveLines.length;k++){
            //loop for adding move id to each moveLine
            moveLines[k].moveId=moveRaw.id;
          }
          models.moveLine.bulkCreate(moveLines).then(()=>{
            preentry.acceptReceipts(moveLines).then(()=>{
              models.moveLine.findAll({
                where:{moveId:moveRaw.id},
                include:[
                  {model:models.account,as:"account"},
                  {model:models.currency,as:"currency"},
                  {model:models.receipt,as:"receipt"}
                ]
              }).then((selectedMoveLines)=>{
                var entryOut={
                  move:moveRaw,
                  moveLines:selectedMoveLines
                }
                resolve(entryOut);
              }).catch(()=>{
                reject("Printing problem occured,Print it manually please");
              });
            }).catch(()=>{
              reject("Receipt problem,Try again please!");
            })
            //bulkcreating
          }).catch(()=>{
            //catch of bulk creating
            models.move.destroy({where:{id:moveRaw.id}}).then(()=>{
              //remove the empty move
              reject("MoveLines Creation Error,Try again.");
            }).catch(()=>{
              //catch of move destroying
              reject("MoveLines Creation Error,Please delete the empty move with id "+moveRaw.id);
            });
          });
        }).catch(()=>{
          //catch of move creation
          reject("Move creation failed!");
        });
      }).catch((error)=>{
        //entryValidation catch
        reject(error);
      })
    });
  },
  deleteEntry:function(id){
    return new Promise((resolve,reject)=>{
      models.move.destroy({where:{id}}).then(()=>{
        resolve(true);
      }).catch((error)=>{
        reject(error);
      });
    });
  },
  deleteMoveLines:function(id){
    return new Promise((resolve,reject)=>{
      models.moveLine.destroy({where:{moveId:id}}).then(()=>{
        resolve();
      }).catch((error)=>{
        reject(error);
      });
    });
  },
  addMoveLines:function(entry){
    return new Promise((resolve,reject)=>{
        models.moveLine.bulkCreate(entry.moveLines).then((moveLinesRows)=>{
          resolve(moveLinesRows);
        }).catch((error)=>{
          //moveLine bulkCreate catch
          reject(error);
        });
    });
  },
  updateMoveNotes:function(entry){
    return new Promise((resolve,reject)=>{
      var notes=entry.move.notes;
      var userId=entry.move.userId;
      var id=entry.move.id;
      models.move.update({notes:notes,userId:userId},{where:{id:id}}).then((moveRaw)=>{
        resolve(moveRaw);
      }).catch((error)=>{
        reject(error);
      });
    });
  },
  editEntry:function(entry){
    return new Promise((resolve,reject)=>{
      entryValidation(entry).then(()=>{
        var promises=[];
        promises.push(this.deleteMoveLines(entry.move.id));
        promises.push(this.addMoveLines(entry));
        promises.push(this.updateMoveNotes(entry));
        Promise.all(promises).then((resolves)=>{
          resolve(resolves);
        }).catch((rejects)=>{
          //promises catch
          reject(rejects);
        });
      }).catch((error)=>{
        //entryValidation catch
        reject(error);
      });
    });
  },
  // getEntry:function(id){
  //   return new Promise((resolve,reject)=>{
  //     models.move.findOne({
  //       where:{id:id},
  //       include:[{model:models.moveLine,as:"moveLines"}]
  //     }).then((moveRaw)=>{
  //       resolve(moveRaw);
  //     }).catch((error)=>{
  //       reject(error);
  //     });
  //   });
  // },
  getEntry:async function(id){
    var move=await models.move.findOne({
      where:{id:id},
      include:[{model:models.user,as:"user"}]
    });
    var moveLines=await models.moveLine.findAll({
      where:{moveId:id},
      include:[
        {model:models.account,as:"account"},
        {model:models.currency,as:"currency"},
        {model:models.receipt,as:"receipt"}
      ]
    });
    if(move){
      var entry={move:move,moveLines:moveLines};
      return entry;
    }
    else{
      return false;
    }
  }
}
