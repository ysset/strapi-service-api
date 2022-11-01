const getUserInfo = require('../../../../botUtils/events/getUserInfo');

module.exports = async (bot) => {
    const { localisation, chatId } = bot;

    await bot.sendMessage(chatId, localisation?.WELCOME.first);

    if (!process.env.DEVELOPMENT && (!bot.user.phoneNumber || !bot.user.fullName)) {
        await getUserInfo(bot);
    }

    await bot
        .sendMessage(chatId, localisation?.WELCOME.second, {
            reply_markup: {
                keyboard: [
                    [
                        {
                            ...localisation.CONTROL_PANEL,
                            web_app: {
                                url:
                                    process.env.REALTOR_WEB_APP_URL +
                                    `${bot.type.toLowerCase()}?language=${bot.language.toLowerCase()}`,
                            },
                        },
                    ],
                ],
                resize_keyboard: true,
            },
        })
        .catch(console.error);
};
