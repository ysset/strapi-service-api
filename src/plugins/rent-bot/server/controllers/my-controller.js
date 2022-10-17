'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('rent-bot')
      .service('myService')
      .getWelcomeMessage();
  },
});
