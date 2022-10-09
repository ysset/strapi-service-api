/**
 * @param chatId
 * @param localisation
 * @returns {Promise<unknown>}
 */
module.exports = async ({ chatId, localisation }) => {
    console.info(`${chatId}, user name error`);
    return strapi.bots.alanyaBot.sendMessage(chatId, localisation?.NO_USERNAME);
};
