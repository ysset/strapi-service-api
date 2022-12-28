const recommendations = require('../../../../botUtils/botManager/recommendationManager');
const actions = require('../actions');
const searchFlatById = require('./searchFlatById');
const searchFlats = require('./searchFlats');

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

    const [history] = await strapi.entityService.findMany('api::message-history.message-history', {
        filters: { callbackMessage: parseInt(messageId) },
        populate: '*',
    });

    if (history) {
        for (const { messageId } of history.messages) {
            await bot.deleteById(messageId);
        }

        await bot.delete();

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
        searchFlatById(bot);
    } else {
        await bot.editMessageReplyMarkup(
            {
                inline_keyboard: [
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
        searchFlats(bot);
    }
};
