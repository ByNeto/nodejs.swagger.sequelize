'use strict';

module.exports = (sequelize, DataTypes) => {
 return  sequelize.define('Cliente', {
   id_cliente: {type: DataTypes.INTEGER(11),allowNull: false,primaryKey: true,autoIncrement: true},
   id_hash: {type: DataTypes.STRING(200),allowNull: false},
   ativo: {type: DataTypes.STRING(1),allowNull: false},
   cnpj_cli: {type: DataTypes.STRING(18),allowNull: false},
   razao_cli: {type: DataTypes.STRING(60),allowNull: false},
   nome_cli: {type: DataTypes.STRING(60),allowNull: false},
   cep: {type: DataTypes.STRING(10),allowNull: false},
   endereco: {type: DataTypes.STRING(60),allowNull: false},
   numero: {type: DataTypes.STRING(10),allowNull: false},
   bairro: {type: DataTypes.STRING(45),allowNull: false},
   cod_cidade: {type: DataTypes.STRING(10),allowNull: false},
   cidade: {type: DataTypes.STRING(45),allowNull: false},
   layout_personalizado: {type: DataTypes.STRING(1),allowNull: false},
   dt_cadastro: {type: DataTypes.DATE,allowNull: false},
   dt_alteracao: {type: DataTypes.DATE,allowNull: false},
   segmento_id_segmento: {type: DataTypes.INTEGER(11),allowNull: false},
   usuario_id_usuario: {type: DataTypes.INTEGER(11),allowNull: false}
 },{
   tableName: 'Cliente',freezeTableName: true,timestamps: false
   });
};