module.exports = async (query) => {
    const { chatId, messageId } = query;

    return await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);
};
