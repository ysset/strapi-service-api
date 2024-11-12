'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('storage')
      .service('adminService')
      .getWelcomeMessage();
  },
});
