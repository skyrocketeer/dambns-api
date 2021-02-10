'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('zodiac_animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      animal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fengshui_element: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    },{
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    })
    .then(() => {
      queryInterface.addIndex('zodiac_animals',['year'],{indicesType: 'UNIQUE'});
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('zodiac_animals');
  }
};