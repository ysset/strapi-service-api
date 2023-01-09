'use strict';

/**
 * bla-bla-car-client controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bla-bla-car-client.bla-bla-car-client', {
    async findClient(ctx) {
        const id = ctx.params.id;
        const clients = await strapi.entityService.findMany('api::bla-bla-car-client.bla-bla-car-client', {
            filters: {
                telegramId: id,
            },
        });
        if (!clients.length) return null;
        const client = clients.find((el) => el.telegramId === id);
        if (!client) return null;
        return client;
    },
});
