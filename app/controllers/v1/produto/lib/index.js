'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents produto orchestration trough database
 */
class Produto {
  /**
   * Adds a produto to database
   *
   * @param {Object} produto - produto JSON object
   */
  add(produto) {
    return new Promise((resolve, reject) => {
      db.Produto.create(produto).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all produto from database
   *
   * @returns {Array}
   */
  list(){
    return new Promise((resolve, reject) => {
      db.Produto.findAll().then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get a specific produto
   *
   * @param {Integer} id_produto - produto id
   * @returns {Object}
   */
  get(produtoId){
    return new Promise((resolve, reject) => {
      db.Produto.findOne({
          where : {
            id_produto : produtoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * GetCnpj a specific produto cnpj
   *
   * @param {String} cnpj_cli - cnpj_cli
   * @returns {Object}
   */
  getCnpj(cnpj_cli){
    return new Promise((resolve, reject) => {
      db.Produto.findOne({
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
   * Removes a produto from database
   *
   * @param {Integer} id_produto - produto id
   */
  remove(produtoId) {
    return new Promise((resolve, reject) => {
      db.Produto.destroy({
          where : {
            id_produto : produtoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific produto on database
   *
   * @param {Integer} id_produto - produto id
   */
  update(produtoId, data) {
    return new Promise((resolve, reject) => {
      db.Produto.update(data, {
          where : {
            id_produto : produtoId
          }
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Produto;