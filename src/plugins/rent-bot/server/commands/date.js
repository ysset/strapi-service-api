const { changeDate, deleteMessage } = require('../api');
const { noUsername } = require('../errorHandlers');

/**
 * @param msg
 * @returns {Promise<*>}
 */
module.exports = async (msg) => {
    if (!process.env.DEVELOPMENT && !msg.user.username) return noUsername(msg);
    await changeDate(msg);
    await deleteMessage(msg);
};
