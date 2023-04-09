'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Interaction.belongsTo(models.Reaction, {foreignKey: "reactionId", targetKey: "id", as: "reactionData"});
      Interaction.belongsTo(models.Book, {foreignKey: "bookId", targetKey: "id", as: "bookData"});
      Interaction.belongsTo(models.User, {foreignKey: "userId", targetKey: "id", as: "userData"});
      Interaction.belongsTo(models.Category, {foreignKey: "categoryId", targetKey: "id", as: "categoryData"});
    }
  }
  Interaction.init({
    reactionId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interaction',
  });
  return Interaction;
};