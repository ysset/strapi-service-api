'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('telegram-bot-example')
      .service('myService')
      .getWelcomeMessage();
  },
};
