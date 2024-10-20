'use strict';

/**
 * bot controller
 */

module.exports = {
    async getAll(ctx) {
        const res = strapi.entityService.findMany(
            "api::bot.bot",
            {
               filters: {
                isActive: true
               } 
            }
        )
        console.log(res);
    },
};