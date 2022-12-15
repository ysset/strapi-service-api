const eventStorage = require('./eventStorage');

const createEvent = ({ telegramID, dbKey, userId, regexes, localisation, rejectEvent, bot, resolveHook }) =>
    Promise.timeout(
        new Promise((resolve) => {
            if (!resolveHook) resolveHook = () => {};
            const event = async (msg) => {
                if (msg.contact || regexes.some((regex) => msg.text.match(regex))) {
                    await strapi.entityService
                        .update('api::telegram-user.telegram-user', userId, {
                            data: {
                                [dbKey]: msg.text || msg.contact.phone_number,
                            },
                        })
                        .catch(console.error);
                    return resolve(resolveHook());
                } else {
                    await bot.sendMessage(telegramID, localisation.INPUT_ERROR[dbKey]).catch(console.error);
                }
            };
            eventStorage.createEvent({ telegramID, event });
        }),
        300000,
        rejectEvent
    ).catch(console.error);

module.exports = createEvent;
