'use strict';


const Service = require('egg').Service;

class ArticleService extends Service {
  async list(params) {
    const { app } = this;
    const { page, pageSize, type } = params;
    try {
      const searchParams = { orders: [[ 'id', 'desc' ]] };
      if (parseInt(type)) { searchParams.where = { type: parseInt(type) }; }
      const allList = JSON.parse(JSON.stringify(await app.mysql.select('article', searchParams)));
      const list = allList.slice((parseInt(page) - 1) * pageSize, parseInt(page) * pageSize);
      const result = {
        total: allList.length,
        list,
        pageSize: parseInt(pageSize),
        page: parseInt(page),
      };
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('article', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('article', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getOne(params) {
    const { app } = this;
    try {
      const result = await app.mysql.get('article', { id: params.id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = ArticleService;
