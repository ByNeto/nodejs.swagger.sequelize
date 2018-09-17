'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents tblog orchestration trough database
 */
class Tblog {
  /**
   * Adds a tblog to database
   *
   * @param {Object} tblog - tblog JSON object
   */
  add(tblog) {
    return new Promise((resolve, reject) => {
      db.Tblog
        .create(tblog)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all tblog from database
   *
   * @returns {Array}
   */
  list() {
    return new Promise((resolve, reject) => {
      db.Tblog
        .findAll()
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get a specific tblog
   *
   * @param {Integer} id - cliente id
   * @returns {Object}
   */
  get(clienteId) {
    return new Promise((resolve, reject) => {
      db.Tblog
        .findOne({
          where : {
            id : clienteId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
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
  getCnpj(cnpj_cli) {
    return new Promise((resolve, reject) => {
      db.Tblog
        .findOne({
          where : {
            cnpj_cli : cnpj_cli
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Removes a cliente from database
   *
   * @param {Integer} id - cliente id
   */
  remove(clienteId) {
    return new Promise((resolve, reject) => {
      db.Tblog
        .destroy({
          where : {
            id : clienteId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific cliente on database
   *
   * @param {Integer} id - cliente id
   */
  update(clienteId, data) {
    return new Promise((resolve, reject) => {
      db.Tblog
        .update(data, {
          where : {
            id : clienteId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Tblog;

