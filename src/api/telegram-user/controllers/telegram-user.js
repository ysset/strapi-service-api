'use strict';

const { inlineCallBacks } = require('../../../plugins/xatta-bot/server/bot/components/index');
const { modifyRequestWithUserData } = require('../../../plugins/xatta-bot/botUtils/userController/index');
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

    async userFavorites(ctx) {
        return inlineCallBacks.FAVORITE_HOUSINGS(await modifyRequestWithUserData({ msg: ctx.request.body }));
    },

    async search(ctx) {
        return inlineCallBacks.SEARCH_FLATS({
            filters: ctx.request.body.filters,
            ...(await modifyRequestWithUserData({ msg: ctx.request.body })),
        });
    },
});
