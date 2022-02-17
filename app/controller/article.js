'use strict';

const moment = require('moment');
const Controller = require('egg').Controller;

class ArticleController extends Controller {
  // get 文章列表
  async list() {
    const { ctx } = this;
    const params = ctx.query;
    const result = await ctx.service.article.list(params);

    if (result) {
      if (Array.isArray(result.list)) {
        result.list = result.list.map(item => ({
          ...item,
          commentsNum: item.comment.length || 0,
          time: this.ctx.helper.formatTimeStamp(item.time, 's'),
        }));
      }
      this.ctx.helper.success({ ctx, res: result });
    } else {
      ctx.body = {
        status: 500,
        errMsg: '获取失败',
      };
    }
  }

  // post 创建文章
  async create() {
    const { ctx } = this;
    const params = {
      ...ctx.request.body,
      comment: '',
      time: moment().format('YYYY-MM-DD h:mm:ss'),
    };
    const result = await ctx.service.article.create(params);
    if (result) {
      ctx.helper.success({ ctx });
    } else {
      ctx.helper.fail({ ctx });
    }
  }

  // post 更新文章
  async update() {
    const { ctx } = this;
    const params = {
      ...ctx.request.body,
    };
    const result = await ctx.service.article.update(params);
    if (result) {
      ctx.helper.success({ ctx });
    } else {
      ctx.helper.fail({ ctx });
    }
  }

  // get 获取单篇文章详情
  async getOne() {
    const { ctx } = this;
    const params = ctx.query;
    const result = await ctx.service.article.getOne(params);
    if (result) {
      ctx.helper.success({ ctx, res: result });
    } else {
      ctx.helper.fail({ ctx });
    }
  }
}

module.exports = ArticleController;
