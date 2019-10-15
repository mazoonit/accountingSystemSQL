module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'moveLines',
        'moveId',
        {
          type: Sequelize.INTEGER,
  	references:{
  		model:'moves',
  		key:'id'
  	},
  	onDelete:'CASCADE',
    allowNull:false
        }
      ),





      queryInterface.addColumn(
        'moveLines',
        'invoiceId',
        {
          type: Sequelize.INTEGER,
  	references:{
  		model:'invoices',
  		key:'id'
  	},
  	onDelete:'CASCADE',
    allowNull:true
        }
      ),





      queryInterface.addColumn(
        'moveLines',
        'paymentReceiptId',
        {
          type: Sequelize.INTEGER,
  	references:{
  		model:'paymentReceipts',
  		key:'id'
  	},
  	onDelete:'CASCADE',
    allowNull:true
        }
      ),


      queryInterface.addColumn(
        'moveLines',
        'receiveReceiptId',
        {
          type: Sequelize.INTEGER,
    references:{
      model:'receiveReceipts',
      key:'id'
    },
    onDelete:'CASCADE',
    allowNull:true
        }
      ),






      queryInterface.addColumn(
        'moveLines',
        'accountId',
        {
          type: Sequelize.INTEGER,
  	references:{
  		model:'accounts',
  		key:'id'
  	},
  	onDelete:'CASCADE',
    allowNull:false
        }
      ),






      queryInterface.addColumn(
        'moveLines',
        'currencyId',
        {
          type: Sequelize.INTEGER,
  	references:{
  		model:'currencies',
  		key:'id'
  	},
  	onDelete:'CASCADE',
    allowNull:false
        }
      ),


    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('moveLines', 'invoiceId'),
      queryInterface.removeColumn('moveLines', 'receiveReceiptId'),
      queryInterface.removeColumn('moveLines', 'paymentReceiptId'),      
      queryInterface.removeColumn('moveLines', 'currencyId'),
      queryInterface.removeColumn('moveLines', 'moveId'),
      queryInterface.removeColumn('moveLines', 'accountId'),
    ]);
  }
};
