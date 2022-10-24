const eventStorage = require('./storage');

const createEvent = ({ telegramID, dbKey, userId, regexes, localisation, rejectEvent }) =>
    Promise.timeout(
        new Promise((resolve) => {
            const event = async (msg) => {
                if (msg.contact || regexes.some((regex) => msg.text.match(regex))) {
                    await strapi.entityService
                        .update('api::telegram-user.telegram-user', userId, {
                            data: {
                                [dbKey]: msg.text || msg.contact.phone_number,
                            },
                        })
                        .catch(console.error);
                    return resolve();
                } else {
                    await strapi.bots.alanyaBot
                        .sendMessage(telegramID, localisation.INPUT_ERROR[dbKey])
                        .catch(console.error);
                }
            };
            eventStorage.createEvent({ telegramID, event });
        }),
        300000,
        rejectEvent
    ).catch(console.error);

module.exports = createEvent;
