module.exports = {
    NO_FLATS: async ({ chatId, localisation, bot }) => {
        console.info(`${chatId}, No flats error`);
        await bot.sendMessage(chatId, localisation?.NO_FLATS);
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
