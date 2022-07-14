module.exports = async (query) => {
    const localisation = query.localisation;
    const chatId = query.message?.chat.id || query.chat.id;
    const messageId = query.message?.message_id || query.message_id;

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

    return await strapi.bots.alanyaBot.sendMessage(chatId, 'Выберите подгруппу', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...localisation.SEARCH_FLATS,
                        callback_data: JSON.stringify({
                            action: 'SEARCH_FLATS',
                        }),
                    },
                ],
                [
                    {
                        ...localisation.GO_BACK_ACTION,
                        callback_data: JSON.stringify({
                            action: 'ENTER_COMMAND',
                        }),
                    },
                ],
            ],
        },
    });
};
