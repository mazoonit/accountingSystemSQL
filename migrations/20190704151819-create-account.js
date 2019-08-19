'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
	      unique:true      },
      accountNature: {
        type: Sequelize.ENUM('credit','debit'),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('currentAssets', 'nonCurrentAssets', 'currentLiabilities', 'nonCurrentLiabilities','shareholdersEquity','revenues','expenses'),
        allowNull: false
      },
      major: {
        type: Sequelize.STRING,
        allowNull: false
      },
      debit: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      credit: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      exchangeRate: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
  //     currenyId: {
  //       type: Sequelize.INTEGER,
  //       allowNull: false,
	// references:{
	// 	model:'currencies',
	// 	key:'id'
	// }
  //     },
      character: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
	defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
	defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accounts');
  }
};
