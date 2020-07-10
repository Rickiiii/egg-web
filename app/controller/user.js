'use strict';

const Controller = require('egg').Controller;

const createRule = {
  id: {
    type: 'string',
    require: true,
    max: 10,
  },
};

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const { username } = ctx.query;
    ctx.body = username;
  }

  async list() {
    const { ctx } = this;
    const result = await ctx.service.user.list();

    if (result) {
      this.ctx.helper.success({ ctx, code: 200, res: result, msg: '请求成功' });
    } else {
      ctx.body = {
        status: 500,
        errMsg: '获取失败',
      };
    }
  }

  async add() {
    const { ctx } = this;
    const params = {
      ...ctx.request.body,
    };
    const result = await ctx.service.user.add(params);
    if (result) {
      this.ctx.helper.success({ ctx, code: 200, res: 'success', msg: '请求成功' });
    } else {
      this.ctx.helper.fail({ ctx, code: 500, res: '参数错误', msg: '请求失败' });
    }
  }

  async update() {
    const { ctx } = this;
    const params = {
      ...ctx.request.body,
    };
    const result = await ctx.service.user.update(params);
    if (result) {
      ctx.body = {
        status: 200,
        data: result,
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '编辑失败',
      };
    }
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    const result = await ctx.service.user.delete(id);
    if (result) {
      ctx.body = {
        status: 200,
        data: ctx.helper,
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '删除失败',
      };
    }
  }

  async userById() {
    const { ctx } = this;
    const id = ctx.query.id || ctx.params.id || ctx.request.body.id;
    console.log(id, ctx.query, ctx.params, ctx.request.body);
    const result = await ctx.service.user.userById(id);
    if (result) {
      ctx.body = {
        status: 200,
        data: result,
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '获取失败',
      };
    }
  }
}

module.exports = UserController;
