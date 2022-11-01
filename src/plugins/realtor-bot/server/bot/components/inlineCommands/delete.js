const recommendations = require('../../../../botUtils/botManager/recommendationManager');
const { getUser } = require('../../../../../utils');

module.exports = async (bot) => {
    const { user } = await getUser(bot);
    const { chatId, data, localisation, messageId } = bot;
    const { table, flatId } = data;

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
