module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'paymentReceipts',
        'userId',
        {
          type: Sequelize.INTEGER,
  	references:{
  		model:'users',
  		key:'id'
  	}
  }
      ),





      queryInterface.addColumn(
        'paymentReceipts',
        'cashAccount',
        {
          type: Sequelize.INTEGER,
  	references:{
  		model:'accounts',
  		key:'id'
  	},
  	onDelete:'CASCADE',
    allowNull:true
        }
      ),




      queryInterface.addColumn(
        'paymentReceipts',
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
        'paymentReceipts',
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
      queryInterface.removeColumn('paymentReceipts', 'accountId'),
      queryInterface.removeColumn('paymentReceipts', 'currencyId'),
      queryInterface.removeColumn('paymentReceipts', 'cashAccount'),
      queryInterface.removeColumn('paymentReceipts', 'userId')

        ]);
  }
};
