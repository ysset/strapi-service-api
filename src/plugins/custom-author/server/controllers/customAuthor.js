'use strict';

module.exports = ({ strapi }) => ({
    create(ctx) {
        ctx.body = strapi.plugin('custom-author').service('create').create(ctx);
    },
});
