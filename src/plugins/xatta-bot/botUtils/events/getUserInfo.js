const createEvent = require('./createEvent');
const eventStorage = require('./storage');

module.exports = (bot) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (_, reject) => {
        const {
            chatId,
            user: { id, fullName, phoneNumber },
            localisation,
        } = bot;

        if (!fullName || !phoneNumber) await bot.reply(localisation.GET_USER_INFO);

        if (!fullName) {
            await bot.reply(localisation.ENTER_FULL_NAME);
            await createEvent({
                localisation,
                telegramID: chatId,
                dbKey: 'fullName',
                userId: id,
                regexes: [/^[А-яA-z]{2,} [А-яA-z]{2,} [А-яA-z]{2,}$/],
                rejectEvent: () => reject(`${chatId} full name question time is over`),
            });
            eventStorage.clearEvents(chatId);
        }

        if (!phoneNumber) {
            await bot.reply(localisation.ENTER_PHONE_NUMBER);
            await createEvent({
                localisation,
                telegramID: chatId,
                dbKey: 'phoneNumber',
                userId: id,
                regexes: [
                    /^\+\d{1,4}\d{10}$/,
                    /^\+\d{1,4} \d{10}$/,
                    /^\+\d{1,4}\d{3} \d{3} \d{4}$/,
                    /^\+\d{1,4} \d{3} \d{3} \d{4}$/,
                    /^\+\d{1,4}\d{3} \d{3} \d{2} \d{2}$/,
                    /^\+\d{1,4} \d{3} \d{3} \d{2} \d{2}$/,
                ],
                rejectEvent: () => reject(`${chatId} phone number question time is over`),
            });
            eventStorage.clearEvents(chatId);
        }
    });
