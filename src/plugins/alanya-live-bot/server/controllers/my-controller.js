'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('alanya-live-bot')
      .service('myService')
      .getWelcomeMessage();
  },
};
