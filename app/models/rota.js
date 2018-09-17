'use strict';

module.exports = (sequelize, DataTypes) => {
 return  sequelize.define('Rota', {
   id_rota: {type: DataTypes.INTEGER(11),allowNull: false,primaryKey: true,autoIncrement: true},
   desc_rota: {type: DataTypes.STRING(45),allowNull: false},
   desc_completa: {type: DataTypes.TEXT('tiny'),allowNull: false},
   hospedagem: {type: DataTypes.STRING(45),allowNull: false},
   nome_sever: {type: DataTypes.STRING(45),allowNull: false},
   ip_server: {type: DataTypes.STRING(45),allowNull: false},
   tipo_banco: {type: DataTypes.STRING(45),allowNull: false},
   nome_banco: {type: DataTypes.STRING(45),allowNull: false},
   user_db: {type: DataTypes.STRING(45),allowNull: false},
   pass_db: {type: DataTypes.STRING(45),allowNull: false},
   cliente_id_cliente: {type: DataTypes.INTEGER(11),allowNull: false}
 },{
   tableName: 'Rota',freezeTableName: true,timestamps: false
   });
};