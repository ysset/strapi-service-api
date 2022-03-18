'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('tgBotConstructor')
      .service('myService')
      .getWelcomeMessage();
  },
};
