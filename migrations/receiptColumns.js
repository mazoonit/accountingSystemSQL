module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'receipts',
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
        'receipts',
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
        'receipts',
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
        'receipts',
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
      queryInterface.removeColumn('receipts', 'accountId'),
      queryInterface.removeColumn('receipts', 'currencyId'),
      queryInterface.removeColumn('receipts', 'cashAccount'),
      queryInterface.removeColumn('receipts', 'userId')

        ]);
  }
};
