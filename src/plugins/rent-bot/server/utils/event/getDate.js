const eventStorage = require('./eventStorage');
const dateStorage = require('./dateStorage');

/**
 * @param telegramID
 * @param key
 * @param regexes
 * @param localisation
 * @returns {Promise<unknown>}
 */
const createEvent = async ({ telegramID, regexes, localisation }) =>
    new Promise((resolve) => {
        const event = async (msg) => {
            if (regexes.some((regex) => msg.text.match(regex))) {
                dateStorage.createDateFilter({ telegramID, date: msg.text });
                eventStorage.clearEvents(telegramID);
                resolve();
            } else {
                await strapi.bots.rent.sendMessage(telegramID, localisation.INPUT_ERROR.date);
            }
        };
        eventStorage.createEvent({ telegramID, event });
    });

/**
 * @param msg
 * @returns {Promise<*>}
 */
module.exports = async (msg) => {
    const { chatId, localisation } = msg;
    await strapi.bots.rent.sendMessage(chatId, localisation.DATE);
    await createEvent({
        localisation,
        telegramID: chatId,
        regexes: [/^\d{2}.\d{2}.\d{4} - \d{2}.\d{2}.\d{4}/, /^\d{2}.\d{2}.\d{4}-\d{2}.\d{2}.\d{4}/],
    });
};
