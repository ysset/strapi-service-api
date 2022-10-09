module.exports = {
    alanyaBot: {
        NO_FLATS: async ({ chatId, localisation }) => {
            console.info(`${chatId}, No flats error`);
            await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.NO_FLATS, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                ...localisation.REPEAT_SEARCH_FLATS,
                                callback_data: JSON.stringify({
                                    action: 'REPEAT_SEARCH_FLATS',
                                }),
                            },
                        ],
                        [
                            {
                                ...localisation.CONTROL_PANEL,
                                web_app: { url: process.env.WEB_APP_URL },
                            },
                        ],
                    ],
                },
            });
        },
        NO_USERNAME: async ({ chatId, localisation }) => {
            console.info(`${chatId}, user name error`);
            return strapi.bots.alanyaBot.sendMessage(chatId, localisation?.NO_USERNAME);
        },

        SERVER_ERROR: async ({ chatId, localisation }) => {
            console.info(`${chatId}, server error error`);
            return strapi.bots.alanyaBot.sendMessage(chatId, localisation?.SERVER_ERROR, {
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
            });
        },
    },
};
