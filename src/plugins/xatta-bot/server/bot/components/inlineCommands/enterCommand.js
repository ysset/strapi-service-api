module.exports = async (msg) => {
    const { user, localisation, chatId } = msg;

    if (user.showPromo) {
        await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.FIRST_TIME_START_PRESS.text);
        await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
            data: {
                showPromo: false,
            },
        });
    }

    await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation?.WELCOME, {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Bot control panel',
                            web_app: { url: 'http://192.168.1.174:3000' },
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });
};
