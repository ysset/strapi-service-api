module.exports = async (query) => {
    const { localisation, messageId, chatId } = query;

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
