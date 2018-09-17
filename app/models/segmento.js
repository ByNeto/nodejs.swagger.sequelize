'use strict';

module.exports = (sequelize, DataTypes) => {
 return sequelize.define('Segmento', {
   id_segmento: {type: DataTypes.INTEGER,allowNull: false,primaryKey: true,autoIncrement: true},
   desc_segmento: {type: DataTypes.STRING,allowNull: false}
 },{
   tableName: 'Segmento',freezeTableName: true,timestamps: false
 });
};