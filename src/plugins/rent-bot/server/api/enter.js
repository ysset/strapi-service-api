const { getUserInfo } = require('../utils');

module.exports = async (bot) => {
    const { localisation } = bot;

    await bot.reply(localisation.WELCOME.first);
    await bot.reply(localisation.WELCOME.second);
    await bot.delete();

    return getUserInfo(bot);
};
