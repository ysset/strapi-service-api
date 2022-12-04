module.exports = {
    NO_USERNAME: async ({ chatId, localisation, bot }) => bot.sendMessage(chatId, localisation?.NO_USERNAME),
};
