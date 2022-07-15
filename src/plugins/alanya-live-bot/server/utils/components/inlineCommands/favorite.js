module.exports = async (query) => {
    const localisation = query.localisation;
    const chatId = query.message?.chat.id || query.chat.id;
    const messageId = query.message?.message_id || query.message_id;

    return await strapi.bots.alanyaBot.editMessageText('Выберите подгруппу', {
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
    });
};
