module.exports = {
    NO_USERNAME: async ({ chatId, localisation }) =>
        strapi.bots.alanyaBot.sendMessage(chatId, localisation?.NO_USERNAME),
};
