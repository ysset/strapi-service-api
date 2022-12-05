module.exports = async (bot) => {
    const { localisation, chatId } = bot;
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
                        },
                    ],
                    [
                        {
                            ...localisation.INF_TOUR_BUTTON,
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
