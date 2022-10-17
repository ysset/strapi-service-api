const { getDate } = require('../utils');

module.exports = async (bot) => {
    const { localisation } = bot;

    await bot.reply(localisation.WELCOME.first);
    await bot.reply(localisation.WELCOME.second);
    await bot.delete();

    await getDate(bot);

    await bot.reply('filters', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...localisation.CONTROL_PANEL,
                        web_app: { url: process.env.RENT_WEB_APP_URL },
                    },
                ],
            ],
            resize_keyboard: true,
        },
    });
};
