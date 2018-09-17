'use strict';

module.exports = (sequelize, DataTypes) => {
 return sequelize.define('Usuario', {
   id_usuario: {type: DataTypes.INTEGER,allowNull: false,primaryKey: true,autoIncrement: true},
   nome: {type: DataTypes.STRING,allowNull: false},
   pass: {type: DataTypes.STRING,allowNull: false},
   ativo: {type: DataTypes.STRING,allowNull: false},
   dt_expira: {type: DataTypes.DATE,allowNull: false}
 },{
   tableName: 'Usuario',freezeTableName: true,timestamps: false
 });
};