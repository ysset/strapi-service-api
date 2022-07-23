const recommendations = require('../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    if (!query.user) return;
    const chatId = query.message.chat.id;
    await recommendations.remove({
        filter: {
            where: {
                telegramID: query.from.id,
            },
            apiKey: 'api::telegram-user.telegram-user',
        },
        data: query.data,
        user: query.user,
    });
    await strapi.bots.alanyaBot.deleteMessage(chatId, query.message.message_id);
};
