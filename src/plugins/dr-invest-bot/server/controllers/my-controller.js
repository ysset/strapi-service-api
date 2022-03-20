'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('dr-invest-bot')
      .service('myService')
      .getWelcomeMessage();
  },
};
