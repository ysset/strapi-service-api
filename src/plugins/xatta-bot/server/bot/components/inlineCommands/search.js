module.exports = async (query) => {
    const { localisation, chatId } = query;

    return await strapi.bots.alanyaBot
        .sendMessage(chatId, 'Выберите подгруппу', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Villa',
                            callback_data: JSON.stringify({
                                action: 'SEARCH_FLATS',
                                table: 'Villa',
                            }),
                        },
                    ],
                    [
                        {
                            text: 'Complex',
                            callback_data: JSON.stringify({
                                action: 'SEARCH_FLATS',
                                table: 'Complex',
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
