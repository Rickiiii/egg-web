'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, eggss';
  }

  async text() {
    const { ctx } = this;
    ctx.body = 'text';
  }
}

module.exports = HomeController;
