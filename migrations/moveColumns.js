module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'moves',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
          	model:'users',
          	key:'id'
          }
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('moves', 'userId')
    ]);
  }
};
