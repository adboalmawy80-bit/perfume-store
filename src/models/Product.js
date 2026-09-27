const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  sizeMl: { type: DataTypes.INTEGER, allowNull: false },
  topNotes: { type: DataTypes.STRING },
  middleNotes: { type: DataTypes.STRING },
  baseNotes: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
  categoryId: { type: DataTypes.INTEGER, references: { model: 'Categories', key: 'id' } }
});

module.exports = Product;
