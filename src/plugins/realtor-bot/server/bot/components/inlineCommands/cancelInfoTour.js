module.exports = async (bot) => {
    const {
        data: { log, msgId },
        chatId,
    } = bot;
    await strapi.entityService.update('api::log.log', log, {
        data: { canceled: true },
    });
    strapi.bots.admin.deleteMessage(chatId, msgId);
};
