'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents segmento orchestration trough database
 */
class Segmento {
  /**
   * Adds a segmento to database
   *
   * @param {Object} segmento - segmento JSON object
   */
  add(segmento) {
    return new Promise((resolve, reject) => {
      db.Segmento.create(segmento).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all segmento from database
   *
   * @returns {Array}
   */
  list() {
    return new Promise((resolve, reject) => {
      db.Segmento.findAll().then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get a specific segmento
   *
   * @param {Integer} id_segmento - segmento id
   * @returns {Object}
   */
  get(segmentoId) {
    return new Promise((resolve, reject) => {
      db.Segmento.findOne({
          where : {
            id_segmento : segmentoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * GetCnpj a specific segmento cnpj
   *
   * @param {String} cnpj_cli - cnpj_cli
   * @returns {Object}
   */
  getCnpj(cnpj_cli) {
    return new Promise((resolve, reject) => {
      db.Segmento.findOne({
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
   * Removes a segmento from database
   *
   * @param {Integer} id_segmento - segmento id
   */
  remove(segmentoId) {
    return new Promise((resolve, reject) => {
      db.Segmento.destroy({
          where : {
            id_segmento : segmentoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific segmento on database
   *
   * @param {Integer} id_segmento - segmento id
   */
  update(segmentoId, data) {
    return new Promise((resolve, reject) => {
      db.Segmento.update(data, {
          where : {
            id_segmento : segmentoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Segmento;