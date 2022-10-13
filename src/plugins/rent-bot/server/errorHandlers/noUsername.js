/**
 * @param chatId
 * @param localisation
 * @returns {Promise<unknown>}
 */
module.exports = async ({ chatId, localisation }) => {
    console.info(`${chatId}, user name error`);
    return strapi.bots.rent.sendMessage(chatId, localisation?.NO_USERNAME);
};
