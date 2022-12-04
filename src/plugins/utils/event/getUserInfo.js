const createEvent = require('./createEvent');
const eventStorage = require('./eventStorage');
const actions = require('../../realtor-bot/server/bot/components/actions');

module.exports = async (bot) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
        const {
            chatId,
            user: { id, /*fullName,*/ phoneNumber },
            localisation,
        } = bot;

        // if (!fullName) {
        //     eventStorage.clearEvents(chatId);
        //     await bot.reply(localisation.ENTER_FULL_NAME);
        //     await createEvent({
        //         localisation,
        //         telegramID: chatId,
        //         dbKey: 'fullName',
        //         userId: id,
        //         regexes: [/^[А-яA-z]{2,}$/],
        //         rejectEvent: () => reject(`${chatId} full name question time is over`),
        //         bot,
        //     });
        //     eventStorage.clearEvents(chatId);
        // }

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
                                        web_app: {
                                            url:
                                                process.env.REALTOR_WEB_APP_URL +
                                                `${bot.type.toLowerCase()}?language=${bot.language.toLowerCase()}`,
                                        },
                                    },
                                    {
                                        ...localisation.FAVORITE,
                                        callback_data: JSON.stringify({ action: actions.FAVORITE_HOUSINGS }),
                                    },
                                ],
                                [
                                    {
                                        ...localisation.INF_TOUR_BUTTON,
                                        callback_data: JSON.stringify({ action: actions.INF_TOUR }),
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
