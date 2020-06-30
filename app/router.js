'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  function all(route, fn) {
    router.post(route, fn);
    router.get(route, fn);
  }
  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);
  router.get('/list', controller.user.list);
  router.post('/add', controller.user.add);
  router.post('/update', controller.user.update);
  router.post('/delete', controller.user.delete);
  all('/id', controller.user.userById);
  // router.get('/test', controller.home.test);
};
