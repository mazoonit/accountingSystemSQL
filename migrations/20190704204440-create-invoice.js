'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  //     userId: {
  //       type: Sequelize.INTEGER,
	// references:{
	// 	model:'users',
	// 	key:'id'
	// },
	// onDelete:'SET NULL'
  //     },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.STRING
      },
  //     clientId: {
  //       type: Sequelize.INTEGER,
	// references:{
	// 	model:'clients',
	// 	key:'id'
	// },
	// allowNull:true
  //     },
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
    return queryInterface.dropTable('invoices');
  }
};
