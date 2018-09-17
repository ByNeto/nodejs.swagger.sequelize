'use strict';

module.exports = (sequelize, DataTypes) => {
 return  sequelize.define('Consumo', {
    seq: {type: DataTypes.INTEGER(11),allowNull: false,primaryKey: true,autoIncrement: true},
    data: {type: DataTypes.DATE,allowNull: false},
    hora: {type: DataTypes.STRING(10),allowNull: false},
    tipo: {type: DataTypes.STRING(45),allowNull: false},
    dt_hr: {type: DataTypes.STRING(45),allowNull: false},
    desc: {type: DataTypes.STRING(45),allowNull: false},
    qtde: {type: DataTypes.INTEGER(11),allowNull: false},
    produto_id_produto: {type: DataTypes.INTEGER(11),allowNull: false},
    cliente_id_cliente: {type: DataTypes.INTEGER(11),allowNull: false}
 },{
   tableName: 'Consumo',freezeTableName: true,timestamps: false
   });
};


