const recommendations = require('../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    if (!query.user) return;

    const { chatId, data, user, localisation, messageId } = query;

    await recommendations.remove({
        filter: {
            where: {
                telegramID: query.from.id,
            },
            apiKey: 'api::telegram-user.telegram-user',
        },
        data,
        user,
    });

    return await strapi.bots.alanyaBot
        .editMessageText(localisation.SELECT_SUBGROUP.text, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.FAVORITE_FLATS,
                            callback_data: JSON.stringify({
                                action: 'FAVORITE_FLATS',
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.GO_BACK_ACTION,
                            callback_data: JSON.stringify({
                                action: 'ENTER_COMMAND',
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });
};
