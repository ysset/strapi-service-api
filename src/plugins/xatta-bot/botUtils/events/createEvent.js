const eventStorage = require('./storage');

const createEvent = ({ telegramID, dbKey, userId, regexes, localisation }) =>
    new Promise((resolve) => {
        const event = async (msg) => {
            if (regexes.some((regex) => msg.text.match(regex))) {
                await strapi.entityService
                    .update('api::telegram-user.telegram-user', userId, {
                        data: {
                            [dbKey]: msg.text,
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
    });

module.exports = createEvent;
