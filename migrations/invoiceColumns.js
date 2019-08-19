module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'invoices',
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
        'invoices',
        'clientId',
        {
          type: Sequelize.INTEGER,
          references:{
            model:'clients',
            key:'id'
          }
        }
      ),

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('invoices', 'clientId'),
      queryInterface.removeColumn('invoices', 'userId')

    ]);
  }
};
