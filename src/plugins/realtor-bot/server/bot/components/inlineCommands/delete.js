const recommendations = require('../../../../botUtils/botManager/recomendationManager');
const { getUser } = require('../../../../botUtils/userController');

module.exports = async (query) => {
    const { user } = await getUser(query);
    const { chatId, data, localisation, messageId } = query;
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

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

    return await strapi.bots.alanyaBot.sendMessage(chatId, localisation.DELETED.text).catch(console.error);
};
