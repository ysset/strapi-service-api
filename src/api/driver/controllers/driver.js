'use strict';

/**
 * driver controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::driver.driver', {
    async findDriver(ctx) {
        const id = ctx.params.id;
        const clients = await strapi.entityService.findMany('api::driver.driver', {
            filters: {
                telegramId: id,
            },
            populate: '*',
        });
        if (!clients.length) return null;
        const client = clients.find((el) => el.telegramId === id);
        if (!client) return null;
        return client;
    },
});
