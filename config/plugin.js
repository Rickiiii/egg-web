'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  helper: {
    enable: true,
    package: 'egg-helper',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};
