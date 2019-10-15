module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'receiveReceipts',
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
        'receiveReceipts',
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
        'receiveReceipts',
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
        'receiveReceipts',
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
      queryInterface.removeColumn('receiveReceipts', 'accountId'),
      queryInterface.removeColumn('receiveReceipts', 'currencyId'),
      queryInterface.removeColumn('receiveReceipts', 'cashAccount'),
      queryInterface.removeColumn('receiveReceipts', 'userId')

        ]);
  }
};
