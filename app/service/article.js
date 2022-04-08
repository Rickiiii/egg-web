'use strict';


const Service = require('egg').Service;

class ArticleService extends Service {
  async list(params) {
    const { app } = this;
    const { page = 1, pageSize = 5, type } = params;
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
      result.comment = JSON.parse(result.comment);
      result.tags = JSON.parse(result.tags);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addComment(params) {
    const { app } = this;
    const { id, comment } = params;
    try {
      const detail = await app.mysql.get('article', { id });
      const newComment = JSON.stringify(JSON.parse(detail.comment).concat(comment));
      const result = await app.mysql.update('article', {
        comment: newComment,
      }, {
        where: { id },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = ArticleService;
