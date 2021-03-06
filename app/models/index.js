'use strict';

const Sequelize = require('sequelize');
const appRoot   = require('app-root-path');
const walkSync = require('walk-sync');

const config = require(`${appRoot}/lib/config`)();

const db = {};


const sequelize = new Sequelize('mtdcontrol','userdev','@0Aws$erver!@#$-',{
  dialect:'mysql',
  host:'54.86.211.90',
  port:'3306'
});

const paths = walkSync(`${appRoot}/app/models`, {
  globs  : ['**/*.js'],
  ignore : ['index.js']
});

paths.forEach((file) => {
  const model    = sequelize.import(`${appRoot}/app/models/${file}`);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
