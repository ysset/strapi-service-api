'use strict';

module.exports = ({ strapi }) => ({
    createNewBot(ctx) {
        return strapi.plugin('bot-console').service('author').createNewBot(ctx);
    },
});
