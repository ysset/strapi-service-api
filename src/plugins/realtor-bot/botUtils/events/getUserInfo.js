const createEvent = require('./createEvent');
const eventStorage = require('./storage');

module.exports = (bot) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
        const {
            chatId,
            user: { id, phoneNumber, fullName },
            localisation,
        } = bot;

        if (!fullName) {
            eventStorage.clearEvents(chatId);
            await bot.reply(localisation.ENTER_FULL_NAME);
            await createEvent({
                localisation,
                telegramID: chatId.toString(),
                dbKey: 'fullName',
                userId: id,
                regexes: [/^[А-яA-z]{2,}$/],
                rejectEvent: () => reject(`${chatId} full name question time is over`),
            });
            eventStorage.clearEvents(chatId);
        }

        if (!phoneNumber) {
            eventStorage.clearEvents(chatId);
            await bot.reply(localisation.ENTER_PHONE_NUMBER, {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: 'send my number',
                                request_contact: true,
                            },
                        ],
                    ],
                    one_time_keyboard: true,
                    resize_keyboard: true,
                },
            });
            await createEvent({
                localisation,
                telegramID: chatId.toString(),
                dbKey: 'phoneNumber',
                userId: id,
                regexes: [/^\+\d{1,4}\d{6,12}$/, /^\d{1,4}\d{6,12}$/],
                rejectEvent: () => reject(`${chatId} phone number question time is over`),
            });
            eventStorage.clearEvents(chatId);
        }
        resolve();
    });
