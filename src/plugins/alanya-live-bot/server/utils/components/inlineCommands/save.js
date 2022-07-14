const recommendations = require('../../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    if (!query.user) return;
    const localisation = query.localisation;

    await recommendations.save({
        filter: {
            where: {
                key: 'telegramID',
                value: query.from.id,
            },
            apiKey: 'api::telegram-user.telegram-user',
        },
        data: query.data,
        user: query.user,
    });

    await strapi.bots.alanyaBot.sendMessage(query.message.chat.id, localisation?.SAVED, {
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
    });
};
