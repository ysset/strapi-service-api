const { validate } = require('@strapi/utils');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-type.service-type', ({ strapi }) => ({
    async getServices(ctx) {
        console.log(ctx.request.params);
        const { id, botId } = ctx.request.params;
        if (id) {
            return await strapi.entityService.findMany('api::service-type.service-type', {
                filters: {
                    id,
                    bots: {
                        id: botId,
                    },
                },
                populate: {
                    services: {
                        populate: {
                            image: true,
                        },
                    },
                },
            });
        } else if (!id)
            return await strapi.entityService.findMany('api::service-type.service-type', {
                filters: {
                    bots: {
                        id: botId,
                    },
                },
            });
    },
}));
