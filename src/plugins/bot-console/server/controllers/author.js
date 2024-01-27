'use strict';

module.exports = ({ strapi }) => ({
    createNewAuthor(ctx) {
        return strapi.plugin('bot-console').service('author').AddNewAuthor(ctx);
    },
});
