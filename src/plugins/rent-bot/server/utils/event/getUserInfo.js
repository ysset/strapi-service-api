const createEvent = require('./createEvent');
const eventStorage = require('./eventStorage');

module.exports = async (bot) => {
    const {
        chatId,
        user: { id, fullName, phoneNumber },
        localisation,
    } = bot;

    if (!fullName || !phoneNumber) await bot.reply(localisation.GET_USER_INFO);

    if (!fullName) {
        eventStorage.clearEvents(chatId);
        await bot.reply(localisation.ENTER_FULL_NAME);
        await createEvent({
            localisation,
            telegramID: chatId,
            dbKey: 'fullName',
            userId: id,
            regexes: [/^[А-яA-z]{2,} [А-яA-z]{2,} [А-яA-z]{2,}$/],
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
            telegramID: chatId,
            dbKey: 'phoneNumber',
            userId: id,
            regexes: [/^\+\d{1,4}\d{6,12}$/, /^\d{1,4}\d{6,12}$/],
        });
        eventStorage.clearEvents(chatId);
    }
};
