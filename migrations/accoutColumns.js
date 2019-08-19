module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'accounts',
        'currencyId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
          	model:'currencies',
          	key:'id'
          },
          onDelete:'CASCADE'

        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('accounts', 'currencyId')
    ]);
  }
};
