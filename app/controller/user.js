'use strict';

const Controller = require('egg').Controller;

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

  async add() {
    const { ctx } = this;
    const params = {
      ...ctx.request.body,
    };
    console.log(ctx.request.body);
    const result = await ctx.service.user.add(params);
    if (result) {
      ctx.body = {
        status: 200,
        data: result,
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '添加失败',
      };
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
    const result = await ctx.service.user.delete(id);
    if (result) {
      ctx.body = {
        status: 200,
        data: result,
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
