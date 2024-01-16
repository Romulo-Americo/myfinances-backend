'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {

    static associate(models) {
      //vinculo de categoria
      this.hasOne(models.Financa, { foreignKey: 'categoria_id' })
    }
  }
  Categoria.init({
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};