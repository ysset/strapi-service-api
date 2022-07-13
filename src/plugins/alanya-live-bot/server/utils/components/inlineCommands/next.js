module.exports = async (query) => {
    if (!query.user) return;

    const chatId = query.message.chat.id;

    await strapi.bots.alanyaBot.deleteMessage(chatId, query.message.message_id);
};
