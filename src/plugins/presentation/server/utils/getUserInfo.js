const createEvent = require('./createEvent');
const eventStorage = require('./eventStorage');

module.exports = async (bot) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
        const {
            chatId,
            user: { id, /*fullName,*/ phoneNumber },
            localisation,
        } = bot;

        if (!phoneNumber) {
            eventStorage.clearEvents(chatId);
            await bot.reply(localisation.ENTER_PHONE_NUMBER, {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                ...localisation.GET_USER_PHONE_BUTTON,
                                request_contact: true,
                            },
                        ],
                    ],
                    resize_keyboard: true,
                },
            });
            await createEvent({
                localisation,
                telegramID: chatId,
                dbKey: 'phoneNumber',
                userId: id,
                regexes: [/^\+\d{1,4}\d{6,12}$/, /^\d{1,4}\d{6,12}$/],
                rejectEvent: () => reject(`${chatId} phone number question time is over`),
                resolveHook: async () =>
                    await bot.reply(localisation.GET_USER_INFO_SUCCESS, {
                        reply_markup: {
                            keyboard: [
                                [
                                    {
                                        ...localisation.CONTROL_PANEL,
                                        callback_data: JSON.stringify(''),
                                    },
                                    {
                                        ...localisation.FAVORITE,
                                        callback_data: JSON.stringify(''),
                                    },
                                ],
                                [
                                    {
                                        ...localisation.INF_TOUR_BUTTON,
                                        callback_data: JSON.stringify(''),
                                    },
                                ],
                            ],
                            resize_keyboard: true,
                        },
                    }),
                bot,
            });
            eventStorage.clearEvents(chatId);
        }
        resolve();
    });
