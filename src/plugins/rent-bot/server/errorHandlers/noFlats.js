module.exports = async ({ chatId, localisation }) => {
    console.info(`${chatId}, No flats error`);
    await strapi.bots.rent.sendMessage(chatId, localisation?.NO_FLATS, {
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
};
