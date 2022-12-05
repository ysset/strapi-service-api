const actions = require('../../../../utils/actions');
const searchFullDescription = require('./searchFullDescription');
const searchWriteAgent = require('./searchWriteAgent');
const searchFlats = require('./searchFlats');
const SFDNF = require('./searchFullDescriptionNextFlat');
const nextFlat = require('./nextFlat');

module.exports = {
    [actions.presentation.START]: require('./start'),
    [actions.presentation.SEARCH_FLATS]: async (bot) => {
        const { localisation, user } = bot;
        if (user.showPromo) {
            await bot.reply(localisation.joke);
            await bot.reply(localisation.onFilterDescription);
            await searchFlats(bot);
            await bot.reply(localisation.buttons);
            await bot.reply(localisation.saveButtonDescription);
            await bot.reply(localisation.nextButtonDescription);
            await bot.reply(localisation.interestButtonDescription);
            await bot.reply(localisation.fullDescriptionDescription);
            await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
                data: {
                    showPromo: false,
                },
            });
            return;
        }
        await searchFlats(bot);
        if (user.phoneNumber) {
            await bot.reply(bot.localisation.interestDescription);
        }
    },
    [actions.presentation.SEARCH_FULL_DESCRIPTION]: async (bot) => {
        const { localisation } = bot;
        await searchFullDescription(bot);
        await bot.reply(localisation.descAdd);
        await bot.reply(localisation.continuePressNext);
    },
    [actions.presentation.SEARCH_WRITE_AGENT]: async (bot) => {
        await searchWriteAgent(bot);
    },
    [actions.presentation.INF_TOUR]: async (bot) => {
        const {
            user: { telegramID: userTelegramId, username },
            localisation,
        } = bot;
        await bot.reply(bot.localisation.freeTourDescription);
        const { telegramID: agentTelegramId } = await strapi.entityService.findOne('api::agent.agent', 1);
        const userMessage = localisation.INF_TOUR;
        const realtorMessage = localisation.infoTourRealtor({ username });

        await bot.sendMessage(userTelegramId, userMessage).catch(console.error);

        await bot.sendMessage(agentTelegramId, realtorMessage, { parse_mode: 'HTML' }).catch(console.error);
        await bot.reply(bot.localisation.cancelFreeTourDescription);
        await bot.reply(bot.localisation.favoriteDescription);
        await bot.reply(bot.localisation.theEnd);
        await strapi.entityService.delete('api::telegram-user.telegram-user', bot.user.id);
    },
    [actions.presentation.SFDNF]: SFDNF,
    [actions.presentation.NEXT_FLAT]: nextFlat,
};
