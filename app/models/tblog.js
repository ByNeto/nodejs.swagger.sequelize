'use strict';

module.exports = (sequelize, DataTypes) => {
 return sequelize.define('Tblog', {
   seq: {type: DataTypes.INTEGER(11),allowNull: false,primaryKey: true,autoIncrement: true},
   data: {type: DataTypes.DATE,allowNull: false},
   hora: {type: DataTypes.STRING(10),allowNull: false},
   descricao: {type: DataTypes.STRING(45),allowNull: false},
   tipo: {type: DataTypes.STRING(45),allowNull: false},
   tabela: {type: DataTypes.STRING(45),allowNull: false},
   dt_hr: {type: DataTypes.STRING(45),allowNull: false},
   desc_compl: {type: DataTypes.TEXT('tiny'),allowNull: false},
   usuario_id_usuario: {type: DataTypes.INTEGER(11),allowNull: false,primaryKey: true}
 },{
   tableName: 'Tblog',freezeTableName: true,timestamps: false
 });
};