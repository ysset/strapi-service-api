'use strict';

/**
 *  telegram-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::telegram-user.telegram-user', {
    async userFilters(ctx) {
        const { id } = ctx.request.body;
        if (!id) return;
        const [user] = await strapi.entityService.findMany('api::telegram-user.telegram-user', {
            filters: { telegramID: id },
            fields: ['filters'],
        });
        if (!user) return;
        return user;
    },
});
