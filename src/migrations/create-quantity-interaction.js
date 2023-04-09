'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QuantityInteractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      watchQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      dislikeQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likeQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('QuantityInteractions');
  }
};