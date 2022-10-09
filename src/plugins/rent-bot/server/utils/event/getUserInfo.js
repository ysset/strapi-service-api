const createEvent = require('./createEvent');
const getDate = require('../event/getDate');

/**
 * @param msg
 * @returns {Promise<*>}
 */
module.exports = async (msg) => {
    const {
        chatId,
        user: { id, fullName, phoneNumber },
        localisation,
    } = msg;

    if (!fullName || !phoneNumber) await strapi.bots.rent.sendMessage(chatId, localisation.GET_USER_INFO);

    if (!fullName) {
        await strapi.bots.rent.sendMessage(chatId, localisation.ENTER_FULL_NAME);
        await createEvent({
            localisation,
            telegramID: chatId,
            dbKey: 'fullName',
            userId: id,
            regexes: [/^[А-яA-z]{2,} [А-яA-z]{2,} [А-яA-z]{2,}$/],
        });
    }

    if (!phoneNumber) {
        await strapi.bots.rent.sendMessage(chatId, localisation.ENTER_PHONE_NUMBER);
        await createEvent({
            localisation,
            telegramID: chatId,
            dbKey: 'phoneNumber',
            userId: id,
            regexes: [/^\+7\d{10}$/, /^\+7\d{3} \d{3} \d{4}$/],
        });
    }

    return getDate(msg);
};
