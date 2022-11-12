const recommendations = require('../../../../botUtils/botManager/recommendationManager');
const searchFlats = require('./searchFlats');
const actions = require('../actions');

module.exports = async (bot) => {
    if (!bot.user) return;

    const { localisation, messageId, chatId, user, data, msg } = bot;

    const { table, flatId } = data;

    await recommendations
        .save({
            where: {
                telegramID: msg.from.id,
            },
            apiKey: 'api::telegram-user.telegram-user',
            data,
            user,
        })
        .catch((e) => {
            console.error(e);
        });

    await bot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    {
                        ...localisation?.FULL_DESCRIPTION,
                        callback_data: JSON.stringify({
                            action: actions.SEARCH_FULL_DESCRIPTION,
                            table,
                            flatId,
                        }),
                    },
                ],
                [
                    {
                        ...localisation?.WRITE_AGENT_INLINE,
                        callback_data: JSON.stringify({
                            action: actions.SEARCH_WRITE_AGENT,
                            table,
                            flatId,
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

    await bot
        .sendMessage(chatId, localisation?.SAVED, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.FAVORITE,
                            callback_data: JSON.stringify({
                                action: actions.FAVORITE_HOUSINGS,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });

    await searchFlats(bot);
};
