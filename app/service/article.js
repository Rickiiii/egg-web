'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async list() {
    const { app } = this;
    try {
      const result = await app.mysql.select('article');
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = ArticleService;
