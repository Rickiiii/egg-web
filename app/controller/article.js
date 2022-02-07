'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, eggss';
  }

  async text() {
    const { ctx } = this;
    ctx.body = 'text';
  }

  async list() {
    const { ctx } = this;
    let result = await ctx.service.article.list();

    if (result) {
      if (Array.isArray(result)) {
        result = result.map(item => ({
          ...item,
          commentsNum: item.comment.length || 0,
          time: this.ctx.helper.formatTimeStamp(item.time, 'm'),
        }));
      }
      this.ctx.helper.success({ ctx, code: 200, res: result, msg: '请求成功' });
    } else {
      ctx.body = {
        status: 500,
        errMsg: '获取失败',
      };
    }
  }
}

module.exports = ArticleController;
