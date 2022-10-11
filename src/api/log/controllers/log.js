'use strict';

/**
 * log controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::log.log', {
    find: async () => {
        return await strapi.entityService.findMany('api::log.log', {
            populate: {
                user: true,
                agent: true,
                owner: true,
                villa: true,
                complex: true,
            },
        });
    },
});
