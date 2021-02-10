'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('happy_wish', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statement: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      age_group: {
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
      queryInterface.addIndex('happy_wish',['age_group'],{indicesType: 'UNIQUE'});
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('happy_wish');
  }
};