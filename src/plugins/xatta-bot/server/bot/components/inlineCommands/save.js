const recommendations = require('../../../../botUtils/botManager/recomendationManager');
const searchFlats = require('./searchFlats');

module.exports = async (query) => {
    if (!query.user) return;

    const { localisation, messageId, chatId, user, data } = query;

    const { table, flatId } = data;

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

    await strapi.bots.alanyaBot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    {
                        ...localisation?.FULL_DESCRIPTION,
                        callback_data: JSON.stringify({
                            action: 'FULL_DESCRIPTION',
                            flat: `api::${table.toLowerCase()}.${table.toLowerCase()}/${flatId}`,
                        }),
                    },
                ],
                [
                    {
                        ...localisation?.WRITE_AGENT_INLINE,
                        callback_data: JSON.stringify({
                            action: 'WRITE_AGENT',
                            table,
                            flatId: flatId,
                        }),
                    },
                ],
            ],
        },
        {
            chat_id: chatId,
            message_id: messageId,
        }
    );

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
                    ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        })
        .catch((e) => {
            console.error(e);
        });

    await searchFlats(query);
};
