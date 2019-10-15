'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employerId: {
        type: Sequelize.INTEGER,
        references:{
          model:'employers',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
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
      clientAccount: {
        type: Sequelize.INTEGER,
        references:{
          model:'accounts',
          key:'id'
        },
        onDelete:'CASCADE'

      },
      profitAccount: {
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
