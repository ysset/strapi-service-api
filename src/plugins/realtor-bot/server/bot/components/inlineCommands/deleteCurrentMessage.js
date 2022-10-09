/**
 * @param msg
 * @returns {Promise<*>}
 */
module.exports = async (msg) => {
    const chatId = msg.message?.chat.id || msg.chat?.id;
    const messageId = msg.message?.message_id || msg.message_id;
    if (chatId && messageId) return await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);
};
