'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('receipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  //     userId: {
  //       type: Sequelize.INTEGER
	// references:{
	// 	model:'users',
	// 	key:'id'
	// },
	// onDelete:'SET NULL'
  //     },
      amount: {
        type: Sequelize.FLOAT
      },
  //     currencyId: {
  //       type: Sequelize.INTEGER,
	// references:{
	// 	model:'currencies',
	// 	key:'id'
	// },
	// onDelete:'SET NULL'
  //     },
      descriptionFromTo: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
  //     cashAccount: {
  //       type: Sequelize.INTEGER,
	// references:{
	// 	model:'accounts',
	// 	key:'id'
	// },
	// onDelete:'CASCADE'
  //     },
  //     accountId: {
  //       type: Sequelize.INTEGER,
	// references:{
	// 	model:'accounts',
	// 	key:'id'
	// },
	// onDelete:'CASCADE'
  //     },
      type: {
        type: Sequelize.ENUM('paymentReceipt', 'receiveReceipt')
      },
      status: {
        type: Sequelize.ENUM('pending', 'accepted'),
        defaultValue:"pending"
      },
      exchangeRate:{
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('receipts');
  }
};
