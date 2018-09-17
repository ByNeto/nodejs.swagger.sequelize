'use strict';

module.exports = (sequelize, DataTypes) => {
 return  sequelize.define('Produto', {
   id_produto: {type: DataTypes.INTEGER(11),allowNull: false,primaryKey: true,autoIncrement: true},
   descricao: {type: DataTypes.STRING(60),allowNull: false},
   desc_compl: {type: DataTypes.TEXT('tiny'),allowNull: false},
   ativo: {type: DataTypes.STRING(1),allowNull: false},
   dt_alteracao: {type: DataTypes.DATE,allowNull: false},
   dt_ativacao: {type: DataTypes.DATE,allowNull: false},
   cliente_id_cliente: {type: DataTypes.INTEGER(11),allowNull: false}
 },{
   tableName: 'Produto',freezeTableName: true,timestamps: false
   });
};