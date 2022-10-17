module.exports = async ({ chatId, localisation }) => {
    await strapi.bots.admin.sendMessage(chatId, localisation.HELP);
};
