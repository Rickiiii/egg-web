'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      console.error('MiddleWare errorHandle', err);
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      const error = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err;
      ctx.status = status;
      ctx.body = {
        error,
      };
    }
  };
};
