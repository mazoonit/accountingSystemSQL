'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('productIs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      clientAccount: {
        type: Sequelize.INTEGER,
        references:{
          model:'accounts',
          key:'id'
        },
        onDelete:'CASCADE'

      },
      supplierAccount: {
        type: Sequelize.INTEGER,
        references:{
          model:'accounts',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      employerId: {
        type: Sequelize.INTEGER,
        references:{
          model:'employers',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      expenseAccount: {
        type: Sequelize.INTEGER,
        references:{
          model:'accounts',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      revenueAccount: {
        type: Sequelize.INTEGER,
        references:{
          model:'accounts',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      currencyId: {
        type: Sequelize.INTEGER,
        references:{
          model:'currencies',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      exchangeRate: {
        type: Sequelize.FLOAT
      },
      productObj: {
        type: Sequelize.TEXT
      },
      productType: {
        type: Sequelize.STRING
      },
      delegateName: {
        type: Sequelize.STRING
      },
      journey: {
        type: Sequelize.STRING
      },
      islamicDate: {
        type: Sequelize.STRING
      },
      entryId: {
        type: Sequelize.INTEGER,
        unique:true,
        references:{
          model:'moves',
          key:'id'
        },
        onDelete:'CASCADE'
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
    return queryInterface.dropTable('productIs');
  }
};
