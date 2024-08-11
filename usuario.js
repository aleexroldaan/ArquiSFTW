const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  UsuarioId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NombreU: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CorreoElectronicoU: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ContraseniaU: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;
