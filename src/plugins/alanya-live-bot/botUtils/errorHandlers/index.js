module.exports = {
    alanyaBot: {
        NO_FLATS: async ({ chatId, localisation }) => {
            await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.NO_FLATS, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                ...localisation?.REPEAT_SEARCH_FLATS,
                                callback_data: JSON.stringify({
                                    action: 'REPEAT_SEARCH_FLATS',
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
        },

        SERVER_ERROR: async ({ chatId, localisation }) =>
            strapi.bots.alanyaBot.sendMessage(chatId, localisation?.SERVER_ERROR, {
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
                },
            }),
    },
};
