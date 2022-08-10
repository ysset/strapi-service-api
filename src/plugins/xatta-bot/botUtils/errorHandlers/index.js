module.exports = {
    alanyaBot: {
        NO_FLATS: async ({ chatId, localisation, table }) => {
            await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.NO_FLATS, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                ...localisation?.REPEAT_SEARCH_FLATS,
                                callback_data: JSON.stringify({
                                    action: 'REPEAT_SEARCH_FLATS',
                                    table,
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
                            {
                                ...localisation?.FAVORITE,
                                callback_data: JSON.stringify({
                                    action: 'FAVORITE_HOUSINGS',
                                }),
                            },
                        ],
                    ],
                },
            });
        },

        SERVER_ERROR: async ({ chatId, localisation }) =>
            strapi.bots.alanyaBot.sendMessage(chatId, localisation?.SERVER_ERROR, {
                reply_markup: {
                    inline_keyboard: [
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
            }),
    },
};
