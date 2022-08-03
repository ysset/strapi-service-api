module.exports = async (query) => {
    const { localisation, chatId, messageId } = query;

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId).catch((e) => {
        console.error(e);
    });

    return await strapi.bots.alanyaBot
        .sendMessage(chatId, 'Выберите подгруппу', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Apartments',
                            callback_data: JSON.stringify({
                                action: 'SEARCH_FLATS',
                                type: 'apartment',
                            }),
                        },
                        {
                            text: 'Villa',
                            callback_data: JSON.stringify({
                                action: 'SEARCH_FLATS',
                                type: 'villa',
                            }),
                        },
                    ],
                    [
                        {
                            text: 'Complex',
                            callback_data: JSON.stringify({
                                action: 'SEARCH_FLATS',
                                type: 'complex',
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
        })
        .catch((e) => {
            console.error(e);
        });
};
