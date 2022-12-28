const actions = require('../actions');

module.exports = async (bot) => {
    const { localisation, chatId } = bot;

    await bot.sendMessage(chatId, localisation?.WELCOME.first);

    await bot
        .sendMessage(chatId, localisation?.WELCOME.second, {
            reply_markup: {
                keyboard: [
                    [
                        {
                            ...localisation.SEARCH,
                            web_app: {
                                url:
                                    process.env.REALTOR_WEB_APP_URL +
                                    `${bot.type.toLowerCase()}?language=${bot.language.toLowerCase()}`,
                            },
                        },
                    ],
                    [
                        {
                            ...localisation.FAVORITE,
                            callback_data: JSON.stringify({ action: actions.FAVORITE_HOUSINGS }),
                        },
                        {
                            ...localisation.INF_TOUR_BUTTON,
                            callback_data: JSON.stringify({ action: actions.INF_TOUR }),
                        },
                    ],
                ],
                resize_keyboard: true,
            },
        })
        .catch(console.error);
};
