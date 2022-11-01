const { NO_USERNAME } = require('../../../../botUtils/errorHandlers');

module.exports = async (bot) => {
    const { msg } = bot;
    const { user, localisation } = msg;
    if (!process.env.DEVELOPMENT && !msg.user.username) return NO_USERNAME(msg);
    const messageId = msg.message?.message_id || msg.message_id;

    await bot.sendMessage(user.telegramID, localisation?.WELCOME);
    return bot.deleteMessage(user.telegramID, messageId);
};
