const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  CategoriaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Categoria;
