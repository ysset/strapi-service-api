const { localisation, userLang } = require('../../../../../botUtils/botsLanguages');

module.exports = async (query) => {
    localisation.current = query.from.language_code;
    const chatId = query.message?.chat.id || query.chat.id;
    const messageId = query.message?.message_id || query.message_id;

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

    return await strapi.bots.alanyaBot.sendMessage(chatId, 'Выберите подгруппу', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...userLang().SEARCH_FLATS,
                        callback_data: JSON.stringify({
                            action: 'SEARCH_FLATS',
                        }),
                    },
                ],
                [
                    {
                        ...userLang().GO_BACK_ACTION,
                        callback_data: JSON.stringify({
                            action: 'ENTER_COMMAND',
                        }),
                    },
                ],
            ],
        },
    });
};
