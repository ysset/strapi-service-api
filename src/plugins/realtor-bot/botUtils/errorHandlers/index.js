module.exports = {
    NO_FLATS: async ({ chatId, localisation, bot }) => {
        console.info(`${chatId}, No flats error`);
        await bot.sendMessage(chatId, localisation?.NO_FLATS, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation.CONTROL_PANEL,
                            web_app: { url: process.env.REALTOR_WEB_APP_URL },
                        },
                    ],
                ],
            },
        });
    },
    NO_USERNAME: async ({ chatId, localisation, bot }) => {
        console.info(`${chatId}, user name error`);
        return bot.sendMessage(chatId, localisation?.NO_USERNAME);
    },

    SERVER_ERROR: async ({ chatId, localisation, bot }) => {
        console.info(`${chatId}, server error error`);
        return bot.sendMessage(chatId, localisation?.SERVER_ERROR, {
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
};
