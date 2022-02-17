'use strict';

/**
 * 路由表
 * @param {String} method 'all' 'post' 'get' 三种 all为post和get都适用
 * @param {String} route 自带/ 填写字符串或不填
 * @param {String} controller 选填 不填的话自动去route的参数
 */
const ROUTE_DATA_SOURCE = {
  // user: [
  //   { method: 'all', route: 'list' },
  //   { method: 'get', route: 'user', controller: 'index' },
  //   { method: 'post', route: 'add' },
  //   { method: 'all', route: 'update' },
  //   { method: 'all', route: 'delete' },
  //   { method: 'all', route: 'userById' },
  // ],
  // home: [
  //   { method: 'get' },
  //   { method: 'get', route: 'text' },
  // ],
  article: [
    { method: 'get', route: 'list' },
    { method: 'post', route: 'create' },
    { method: 'get', route: 'getOne' },
    { method: 'post', route: 'update' },
  ],
};

// 支持get和post请求方法
function allMethod(route, fn, Router) {
  Router.post(route, fn);
  Router.get(route, fn);
}

// 创建路由表
function createRouter(app) {
  const { router, controller } = app;
  for (const firstRoute in ROUTE_DATA_SOURCE) {
    const Router = router.namespace(`/${firstRoute}`);
    ROUTE_DATA_SOURCE[firstRoute].forEach(item => {
      const useController = controller[firstRoute][item.controller || item.route || 'index'];
      console.log(useController);
      item.method === 'all' ? allMethod(`/${item.route || ''}`, useController, Router) : Router[item.method](`/${item.route || ''}`, useController);
    });
  }
}

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  createRouter(app);
  // userRouter(app);
  // router.get('/', controller.home.index);
  // router.get('/user', controller.user.index);
  // all('/id', controller.user.userById);
  // router.get('/test', controller.home.test);
};
