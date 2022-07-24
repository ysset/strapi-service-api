const createNewAuthor = require('../../../../botUtils/userController/createNewAuthor');

/**
 * @param user
 * @param localisation
 * @returns {Promise<void>}
 */
const sendWelcomMessage = async ({ user, localisation }) =>
    await strapi.bots.admin.sendMessage(user.telegramID, localisation?.WELCOME);

/**
 * @param msg
 * @returns {Promise<void>}
 */
module.exports = async (msg) => {
    const { user, localisation } = msg;
    const messageId = msg.message?.message_id || msg.message_id;
    await strapi.bots.admin.deleteMessage(user.telegramID, messageId);

    await createNewAuthor(msg);

    return sendWelcomMessage({ user, localisation });
};
