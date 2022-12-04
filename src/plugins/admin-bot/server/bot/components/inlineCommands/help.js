module.exports = async (bot) => {
    const { chatId, localisation } = bot;
    await bot.sendMessage(chatId, localisation.HELP);
};
