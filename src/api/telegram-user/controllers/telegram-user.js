'use strict';

const { inlineCallBacks } = require('../../../plugins/realtor-bot/server/bot/components/index');
const searchFlats = require('../../../plugins/realtor-bot/server/bot/components/inlineCommands/searchFlats');
const searchRentFlats = require('../../../plugins/rent-bot/server/api/search');
const { modifyRequestWithUserData } = require('../../../plugins/realtor-bot/botUtils/userController/index');
const {
    modifyRequestWithUserData: rentModifyUserData,
} = require('../../../plugins/rent-bot/server/utils/user');

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
        return user.filters;
    },

    async userFavorites(ctx) {
        return inlineCallBacks.FAVORITE_HOUSINGS(await modifyRequestWithUserData({ msg: ctx.request.body }));
    },

    async search(ctx) {
        await searchFlats({
            filters: ctx.request.body.filters,
            ...(await modifyRequestWithUserData({ msg: ctx.request.body })),
        });
        return { ok: true };
    },

    async searchRent(ctx) {
        searchRentFlats({
            filters: ctx.request.body.filters,
            ...(await rentModifyUserData({ msg: ctx.request.body })),
        }).catch(console.error);
        return { ok: true };
    },
});
