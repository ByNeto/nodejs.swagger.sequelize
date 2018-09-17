'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents rota orchestration trough database
 */
class Rota {
  /**
   * Adds a rota to database
   *
   * @param {Object} rota - rota JSON object
   */
  add(rota) {
    return new Promise((resolve, reject) => {
      db.Rota.create(rota).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all rota from database
   *
   * @returns {Array}
   */
  list(){
    return new Promise((resolve, reject) => {
      db.Rota.findAll().then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get a specific rota
   *
   * @param {Integer} id_rota - rota id
   * @returns {Object}
   */
  get(rotaId){
    return new Promise((resolve, reject) => {
      db.Rota.findOne({
          where : {
            id_rota : rotaId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * GetCnpj a specific rota cnpj
   *
   * @param {String} cnpj_cli - cnpj_cli
   * @returns {Object}
   */
  getCnpj(cnpj_cli){
    return new Promise((resolve, reject) => {
      db.Rota.findOne({
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
   * Removes a rota from database
   *
   * @param {Integer} id_rota - rota id
   */
  remove(rotaId) {
    return new Promise((resolve, reject) => {
      db.Rota.destroy({
          where : {
            id_rota : rotaId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific rota on database
   *
   * @param {Integer} id_rota - rota id
   */
  update(rotaId, data) {
    return new Promise((resolve, reject) => {
      db.Rota.update(data, {
          where : {
            id_rota : rotaId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Rota;

