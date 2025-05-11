const { validate } = require('@strapi/utils');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-type.service-type', ({ strapi }) => ({
    async getServices(ctx) {
        const { id, botId, type } = ctx.request.params;
        if (id) {
            return await strapi.entityService.findMany('api::service-type.service-type', {
                filters: {
                    publishedAt: {
                        $ne: null,
                    },
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
                    type: type,
                    publishedAt: {
                        $ne: null,
                    },
                    bots: {
                        id: botId,
                    },
                },
            });
    },
}));
