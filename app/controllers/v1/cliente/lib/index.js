'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents cliente orchestration trough database
 */
class Cliente {
  /**
   * Adds a cliente to database
   *
   * @param {Object} cliente - cliente JSON object
   */
  add(cliente) {
    return new Promise((resolve, reject) => {
      db.Cliente.create(cliente).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all cliente from database
   *
   * @returns {Array}
   */
  list(){
    return new Promise((resolve, reject) => {
      db.Cliente.findAll().then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get a specific cliente
   *
   * @param {Integer} id_cliente - cliente id
   * @returns {Object}
   */
  get(clienteId){
    return new Promise((resolve, reject) => {
      db.Cliente.findOne({
          where : {
            id_cliente : clienteId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * GetCnpj a specific cliente cnpj
   *
   * @param {String} cnpj_cli - cnpj_cli
   * @returns {Object}
   */
  getCnpj(cnpj_cli){
    return new Promise((resolve, reject) => {
      db.Cliente.findOne({
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
   * Removes a cliente from database
   *
   * @param {Integer} id_cliente - cliente id
   */
  remove(clienteId) {
    return new Promise((resolve, reject) => {
      db.Cliente.destroy({
          where : {
            id_cliente : clienteId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific cliente on database
   *
   * @param {Integer} id_cliente - cliente id
   */
  update(clienteId, data) {
    return new Promise((resolve, reject) => {
      db.Cliente.update(data, {
          where : {
            id_cliente : clienteId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Cliente;

