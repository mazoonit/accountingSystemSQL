'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('moveLines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  //     moveId: {
  //       type: Sequelize.INTEGER,
	// references:{
	// 	model:'move',
	// 	key:'id'
	// },
	// onDelete:'CASCADE'
  //     },
  //     invoiceId: {
  //       type: Sequelize.INTEGER
	// references:{
	// 	model:'invoices',
	// 	key:'id'
	// },
	// onDelete:'SET NULL'
  //     },
  //     receiptId: {
  //       type: Sequelize.INTEGER,
	// references:{
	// 	model:'receipts',
	// 	key:'id'
	// },
	// onDelete:'SET NULL'
  //     },
  //     accountId: {
  //       type: Sequelize.INTEGER,
	// references:{
	// 	model:'accounts',
	// 	key:'id'
	// },
	// onDelete:'CASCADE'
  //     },
      debit: {
        type: Sequelize.FLOAT
      },
      credit: {
        type: Sequelize.FLOAT
      },
      exchangeRate: {
        type: Sequelize.FLOAT
      },
  // //     currencyId: {
  // //       type: Sequelize.INTEGER,
	// // references:{
	// // 	model:'currencies',
	// // 	key:'id'
	// // },
	// onDelete:'CASCADE'
  //     },
      notes: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('moveLines');
  }
};
