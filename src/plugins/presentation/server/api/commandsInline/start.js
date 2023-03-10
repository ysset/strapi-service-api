module.exports = async (bot) => {
    const { localisation, chatId } = bot;
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
    await bot
        .sendMessage(chatId, localisation?.startTour, {
            reply_markup: {
                keyboard: [
                    [
                        {
                            ...localisation.CONTROL_PANEL,
                            web_app: {
                                url:
                                    process.env.PRESENTATION_WEB_APP_URL +
                                    `realtor?language=${bot.language.toLowerCase()}`,
                            },
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
        })
        .catch(console.error);

    await bot.reply(localisation.savedDescription);
    await bot.reply(localisation.infoTourDescription);
    await bot.reply(localisation.filtersDescription);
};
