'use strict';

module.exports = ({ strapi }) => ({
    index(ctx) {
        ctx.body = strapi.plugin('presentation').service('myService').getWelcomeMessage();
    },
});
