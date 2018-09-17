'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents usuario orchestration trough database
 */
class Usuario {
  /**
   * Adds a usuario to database
   *
   * @param {Object} usuario - usuario JSON object
   */
  add(usuario) {
    return new Promise((resolve, reject) => {
      db.Usuario.create(usuario).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all usuario from database
   *
   * @returns {Array}
   */
  list() {
    return new Promise((resolve, reject) => {
      db.Usuario.findAll().then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get a specific usuario
   *
   * @param {Integer} id_usuario - usuario id
   * @returns {Object}
   */
  get(usuarioId) {
    return new Promise((resolve, reject) => {
      db.Usuario.findOne({
          where : {
            id_usuario : usuarioId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * GetCnpj a specific usuario cnpj
   *
   * @param {String} cnpj_cli - cnpj_cli
   * @returns {Object}
   */
  getCnpj(cnpj_cli) {
    return new Promise((resolve, reject) => {
      db.Usuario.findOne({
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
   * Removes a usuario from database
   *
   * @param {Integer} id_usuario - usuario id
   */
  remove(usuarioId) {
    return new Promise((resolve, reject) => {
      db.Usuario.destroy({
          where : {
            id_usuario : usuarioId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific usuario on database
   *
   * @param {Integer} id_usuario - usuario id
   */
  update(usuarioId, data) {
    return new Promise((resolve, reject) => {
      db.Usuario.update(data, {
          where : {
            id_usuario : usuarioId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Usuario;