module.exports = {
    alanyaBot: {
        NO_FLATS: async ({ chatId, localisation }) => {
            await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.NO_FLATS, {
                reply_markup: {
                    inline_keyboard: [
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
