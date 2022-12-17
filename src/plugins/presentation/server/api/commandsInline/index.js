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
        const watched =
            (user.watchedVilla?.length || 0) +
            (user.watchedOwner?.length || 0) +
            (user.watchedComplex?.length || 0) +
            (user.watchedRent?.length || 0);
        if (watched === 0) {
            await bot.reply(localisation.onFilterDescription, {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                ...localisation.CONTROL_PANEL,
                                callback_data: JSON.stringify(''),
                            },
                            {
                                ...localisation.FAVORITE,
                                callback_data: JSON.stringify(''),
                            },
                        ],
                        [
                            {
                                ...localisation.INF_TOUR_BUTTON,
                                callback_data: JSON.stringify(''),
                            },
                        ],
                    ],
                    resize_keyboard: true,
                },
            });
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
            user: { telegramID: userTelegramId, username, phoneNumber },
            localisation,
        } = bot;
        await bot.reply(bot.localisation.freeTourDescription);
        const userMessage = localisation.INF_TOUR;
        const realtorMessage = localisation.infoTourRealtor({ username, phoneNumber });

        await bot.sendMessage(userTelegramId, realtorMessage, { parse_mode: 'HTML' }).catch(console.error);

        await bot.sendMessage(userTelegramId, userMessage).catch(console.error);

        await bot.reply(bot.localisation.cancelFreeTourDescription);
        await bot.reply(bot.localisation.favoriteDescription);
        await bot.reply(bot.localisation.theEnd);
        await strapi.entityService.update('api::telegram-user.telegram-user', bot.user.id, {
            data: {
                watchedComplex: [],
                watchedVilla: [],
                watchedRent: [],
                watchedOwner: [],
                favoriteComplex: [],
                favoriteVilla: [],
                favoriteRent: [],
                favoriteOwner: [],
                phoneNumber: null,
                showPromo: true,
            },
        });
    },
    [actions.presentation.SFDNF]: SFDNF,
    [actions.presentation.NEXT_FLAT]: nextFlat,
};
