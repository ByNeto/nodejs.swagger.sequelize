'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents consumo orchestration trough database
 */
class Consumo {
  /**
   * Adds a consumo to database
   *
   * @param {Object} consumo - consumo JSON object
   */
  add(consumo) {
    return new Promise((resolve, reject) => {
      db.Consumo.create(consumo).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all consumo from database
   *
   * @returns {Array}
   */
  list(){
    return new Promise((resolve, reject) => {
      db.Consumo.findAll().then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get a specific consumo
   *
   * @param {Integer} seq - consumo id
   * @returns {Object}
   */
  get(consumoId){
    return new Promise((resolve, reject) => {
      db.Consumo.findOne({
          where : {
            seq : consumoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * GetCnpj a specific consumo cnpj
   *
   * @param {String} cnpj_cli - cnpj_cli
   * @returns {Object}
   */
  getCnpj(cnpj_cli){
    return new Promise((resolve, reject) => {
      db.Consumo.findOne({
          where : {
            cnpj_cli : cnpj_cli
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Removes a consumo from database
   *
   * @param {Integer} seq - consumo id
   */
  remove(consumoId) {
    return new Promise((resolve, reject) => {
      db.Consumo.destroy({
          where : {
            seq : consumoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific consumo on database
   *
   * @param {Integer} seq - consumo id
   */
  update(consumoId, data) {
    return new Promise((resolve, reject) => {
      db.Consumo.update(data, {
          where : {
            seq : consumoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Consumo;