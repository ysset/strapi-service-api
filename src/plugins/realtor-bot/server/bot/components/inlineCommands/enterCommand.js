const getUserInfo = require('../../../../botUtils/events/getUserInfo');

module.exports = async (bot) => {
    const { localisation, chatId } = bot;

    await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.WELCOME.first);

    if (!process.env.DEVELOPMENT && (!bot.user.phoneNumber || !bot.user.fullName)) {
        await getUserInfo(bot);
    }

    await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation?.WELCOME.second, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation.CONTROL_PANEL,
                            web_app: { url: process.env.REALTOR_WEB_APP_URL },
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
                    url: process.env.REALTOR_WEB_APP_URL,
                },
            }),
        })
        .catch(console.error);
};
