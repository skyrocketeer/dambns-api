'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('horoscopes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_time: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      end_time: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      zodiac_sign: {
        allowNull: false,
        type: Sequelize.STRING
      },
      horo_element: {
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('horoscopes');
  }
};