/**
 * @param msg
 * @returns {TelegramBot.Promise}
 */
module.exports = (msg) => {
    const chatId = msg.message?.chat.id || msg.chat?.id;
    const messageId = msg.message?.message_id || msg.message_id;
    if (chatId && messageId) return strapi.bots.alanyaBot.deleteMessage(chatId, messageId);
};
