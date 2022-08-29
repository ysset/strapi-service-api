module.exports = async (msg) => {
    const { localisation, chatId } = msg;

    await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.WELCOME.first);
    await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation?.WELCOME.second, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation.CONTROL_PANEL,
                            web_app: { url: process.env.WEB_APP_URL },
                        },
                    ],
                ],
                resize_keyboard: true,
            },
        })
        .catch(console.error);

    await strapi.bots.alanyaBot
        .setChatMenuButton({
            chat_id: chatId,
            menu_button: JSON.stringify({
                type: 'web_app',
                text: localisation.MENU_BUTTON,
                web_app: {
                    url: process.env.WEB_APP_URL,
                },
            }),
        })
        .catch(console.error);
};
