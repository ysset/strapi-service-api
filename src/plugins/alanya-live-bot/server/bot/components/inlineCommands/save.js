const recommendations = require('../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    if (!query.user) return;

    const { localisation, chatId, user, data } = query;

    await recommendations
        .save({
            filter: {
                where: {
                    telegramID: query.from.id,
                },
                apiKey: 'api::telegram-user.telegram-user',
            },
            data,
            user,
        })
        .catch((e) => {
            console.error(e);
        });

    await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation?.SAVED, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.FAVORITE,
                            callback_data: JSON.stringify({
                                action: 'FAVORITE',
                            }),
                        },
                        {
                            ...localisation?.SEARCH,
                            callback_data: JSON.stringify({
                                action: 'SEARCH',
                            }),
                        },
                    ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        })
        .catch((e) => {
            console.error(e);
        });
};
