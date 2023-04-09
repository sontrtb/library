'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuantityInteraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuantityInteraction.belongsTo(models.Book, {foreignKey: "bookId", targetKey: "id", as: "bookData"})
      QuantityInteraction.belongsTo(models.Category, {foreignKey: "categoryId", targetKey: "id", as: "categoryData"});
    }
  }
  QuantityInteraction.init({
    bookId: DataTypes.INTEGER,
    watchQuantity: DataTypes.INTEGER,
    dislikeQuantity: DataTypes.INTEGER,
    likeQuantity: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuantityInteraction',
  });
  return QuantityInteraction;
};