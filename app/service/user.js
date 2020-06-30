'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async list() {
    const { app } = this;
    try {
      const result = await app.mysql.select('user');
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('user', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('user', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('user', { id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async userById(id) {
    const { app } = this;
    if (!id) {
      console.log('id不能为空');
      return null;
    }
    try {
      const result = await app.mysql.select('user', {
        where: { id },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = UserService;
