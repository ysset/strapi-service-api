const recommendations = require('../../../../botUtils/botManager/recommendationManager');

module.exports = async (bot) => {
    const {
        chatId,
        data: { table, flatId },
        localisation,
        messageId,
        user,
    } = bot;
    if (!user) return;
    await recommendations.remove({
        where: {
            id: flatId,
        },
        apiKey: `api::${table}.${table}`,
        table,
        flatId,
        user,
    });

    await bot.deleteMessage(chatId, messageId);

    return bot.sendMessage(chatId, localisation.DELETED.text).catch(console.error);
};
