const { NO_USERNAME } = require('../../../../botUtils/errorHandlers');

module.exports = async (bot) => {
    const { user, localisation, messageId } = bot;
    if (!process.env.DEVELOPMENT && !user.username) return NO_USERNAME(bot);

    await bot.reply(localisation?.WELCOME);
    return bot.deleteById(messageId);
};
