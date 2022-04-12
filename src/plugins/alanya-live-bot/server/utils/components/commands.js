const { lang, userLang } = require('../../../../botUtils/botsLanguages');
const infinityQueue = require('../../../../botUtils/botManager/recomendationManager');
const { alanyaBot } = require('../../../../botUtils/errorHandlers');
const isUser = require('../../../../botUtils/userController');
const recommendations = new infinityQueue();

const commands = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            const chatId = msg.chat.id;
            const messageId = msg.message_id;

            const user = await isUser({ msg });

            Object.keys(commands).forEach((key) => {
                commands[key].regex = userLang()[key].regex;
            });

            await strapi.bots.alanyaBot.clearTextListeners();
            await strapi.bots.alanyaBot.sendMessage(chatId, userLang().WELCOME.alanyaBot, {
                reply_markup: {
                    keyboard: [[userLang().FAVORITE, userLang().SEARCH]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
            await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);
            if (lang.currentLang) {
                for (const command in commands) {
                    strapi.bots.alanyaBot.onText(commands[command].regex, (msg) =>
                        commands[command].fn({ ...msg, user })
                    );
                }
            }
        },
    },

    FAVORITE: {
        regex: userLang()?.FAVORITE.regex,
        fn: async (msg) => {
            lang.currentLang = msg.from.language_code;
            const chatId = msg.chat.id;

            const messageId = msg.message_id;
            await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

            return await strapi.bots.alanyaBot.sendMessage(chatId, 'Выберите подгруппу', {
                reply_markup: {
                    keyboard: [
                        [
                            // userLang().FAVORITE_CARS,
                            userLang().FAVORITE_FLATS,
                        ],
                    ],
                },
            });
        },
    },

    FAVORITE_CARS: {
        regex: userLang()?.FAVORITE_CARS.regex,
        fn: async (msg) => {
            lang.currentLang = msg.from.language_code;
            const chatId = msg.chat.id;

            if (!msg.user) return;

            if (msg.user.favorite_cars.length === 0) {
                return await strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_FAVORITE_NOW.car, {
                    reply_markup: {
                        keyboard: [[userLang().FAVORITE_FLATS, userLang().SEARCH_CARS]],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                });
            }

            const cars = await strapi.db.query('api::car.car').findMany({
                where: {
                    id: {
                        $in: msg.user.favorite_cars.map((el) => el.id),
                    },
                },
                populate: true,
            });

            for (const car of cars) {
                await strapi.bots.alanyaBot.sendPhoto(
                    chatId,
                    `/Users/ysset/WebstormProjects/tgBotStrapi/public${car.layoutPhoto[0].formats.medium.url}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        ...userLang().WRITE_AGENT_INLINE,
                                        callback_data: JSON.stringify({
                                            action: 'WRITE_AGENT',
                                            agentUsername: car.agent.agentUsername,
                                        }),
                                    },
                                ],
                            ],
                        },
                    }
                );
            }

            await strapi.bots.alanyaBot.sendMessage(chatId, 'Ищем дальше?', {
                reply_markup: {
                    keyboard: [[userLang().FAVORITE_CARS]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
        },
    },

    FAVORITE_FLATS: {
        regex: userLang()?.FAVORITE_FLATS.regex,
        fn: async (msg) => {
            lang.currentLang = msg.from.language_code;
            const chatId = msg.chat.id;
            msg.user = await isUser({ msg });

            if (!msg.user) return;

            if (msg.user.favorite_flats.length === 0) {
                return await strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_FAVORITE_NOW.flat, {
                    reply_markup: {
                        keyboard: [
                            [
                                // userLang().FAVORITE_CARS,
                                userLang().SEARCH_FLATS,
                            ],
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                });
            }

            const flats = await strapi.db.query('api::flat.flat').findMany({
                where: {
                    id: {
                        $in: msg.user.favorite_flats.map((el) => el.id),
                    },
                },
                populate: true,
            });

            for (const flat of flats) {
                await strapi.bots.alanyaBot.sendPhoto(
                    chatId,
                    `/Users/ysset/WebstormProjects/tgBotStrapi/public${flat.layoutPhoto[0].formats.medium.url}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        ...userLang().WRITE_AGENT_INLINE,
                                        callback_data: JSON.stringify({
                                            action: 'WRITE_AGENT',
                                            agentUsername: flat.agent.agentUsername,
                                        }),
                                    },
                                ],
                            ],
                        },
                    }
                );
            }

            await strapi.bots.alanyaBot.sendMessage(chatId, 'Ищем дальше?', {
                reply_markup: {
                    keyboard: [[userLang().SEARCH_FLATS]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
        },
    },

    SEARCH: {
        regex: userLang()?.SEARCH.regex,
        fn: async (msg) => {
            lang.currentLang = msg.from.language_code;
            const chatId = msg.chat.id;

            const messageId = msg.message_id;
            await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

            return await strapi.bots.alanyaBot.sendMessage(chatId, 'Выберите подгруппу', {
                reply_markup: {
                    keyboard: [
                        [
                            userLang().SEARCH_FLATS,
                            // userLang().SEARCH_CARS
                        ],
                    ],
                },
            });
        },
    },

    SEARCH_FLATS: {
        regex: userLang()?.SEARCH_FLATS.regex,
        fn: async (msg) => {
            const chatId = msg.chat.id;
            msg.user = await isUser({ msg });

            if (!msg.user) return;

            const recommendationFlat = await recommendations.get({
                user: msg.user,
                filter: {
                    type: 'FLATS',
                    api: 'api::flat.flat',
                },
            });

            if (!recommendationFlat) {
                return await alanyaBot.NO_FLATS(chatId);
            }
            if (!recommendationFlat.agent.agentUsername) {
                return await alanyaBot.SERVER_ERROR(chatId);
            }

            const photo = recommendationFlat.layoutPhoto;
            const photoUrl = `/Users/ysset/WebstormProjects/tgBotStrapi/public${
                photo[0].formats.medium ? photo[0].formats.medium.url : photo[0].formats.thumbnail.url
            }`;

            console.log(photoUrl);

            await strapi.bots.alanyaBot.sendPhoto(chatId, photoUrl, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                ...userLang().SAVE_INLINE,
                                callback_data: JSON.stringify({
                                    action: 'SAVE',
                                    type: 'FLATS',
                                    recId: recommendationFlat.id,
                                }),
                            },
                            {
                                ...userLang().NEXT_INLINE,
                                callback_data: JSON.stringify({
                                    action: 'NEXT',
                                    type: 'FLATS',
                                }),
                            },
                        ],
                        [
                            {
                                ...userLang().WRITE_AGENT_INLINE,
                                callback_data: JSON.stringify({
                                    action: 'WRITE_AGENT',
                                    agentUsername: recommendationFlat.agent.agentUsername,
                                }),
                            },
                        ],
                    ],
                },
            });
            const params = {
                data: {
                    checked_flats: [...msg.user.checked_flats, recommendationFlat.id],
                },
            };
            await strapi.entityService.update('api::telegram-user.telegram-user', 1, params).catch((e) => {
                console.log(e);
            });
        },
    },

    REPEAT_SEARCH_FLATS: {
        regex: userLang()?.REPEAT_SEARCH_FLATS.regex,
        fn: async (msg) => {
            const params = {
                data: {
                    checked_flats: [],
                },
            };

            await strapi.entityService
                .update('api::telegram-user.telegram-user', msg.user.id, params)
                .catch((e) => {
                    console.log(e);
                });
            return await commands.SEARCH_FLATS.fn(msg);
        },
    },

    SEARCH_CARS: {
        regex: userLang()?.SEARCH_CARS.regex,
        fn: async (msg) => {
            const chatId = msg.chat.id;
            msg.user = await isUser({ msg });

            if (!msg.user) return;

            const recommendationCar = await recommendations.get({
                user: msg.user,
                filter: {
                    type: 'CARS',
                    api: 'api::car.car',
                },
            });

            if (!recommendationCar) {
                return await alanyaBot.NO_CARS(chatId);
            }
            if (!recommendationCar.agent.agentUsername) {
                return await alanyaBot.SERVER_ERROR(chatId);
            }

            const photo = recommendationCar.carPhoto;
            const photoUrl = `/Users/ysset/WebstormProjects/tgBotStrapi/public${
                photo[0].formats.medium ? photo[0].formats.medium.url : photo[0].formats.thumbnail.url
            }`;

            await strapi.bots.alanyaBot.sendPhoto(chatId, photoUrl, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                ...userLang().SAVE_INLINE,
                                callback_data: JSON.stringify({
                                    action: 'SAVE',
                                    type: 'CARS',
                                    recId: recommendationCar.id,
                                }),
                            },
                            {
                                ...userLang().NEXT_INLINE,
                                callback_data: JSON.stringify({
                                    action: 'NEXT',
                                    type: 'CARS',
                                }),
                            },
                        ],
                        [
                            {
                                ...userLang().WRITE_AGENT_INLINE,
                                callback_data: JSON.stringify({
                                    action: 'WRITE_AGENT',
                                    agentUsername: recommendationCar.agent.agentUsername,
                                }),
                            },
                        ],
                    ],
                },
            });
            await strapi.entityService.update('api::telegram-user.telegram-user', msg.user.id, {
                checked_cars: [...msg.user.checked_cars, recommendationCar.id],
            });
        },
    },

    REPEAT_SEARCH_CARS: {
        regex: userLang()?.REPEAT_SEARCH_CARS.regex,
        fn: async (msg) => {
            const chatId = msg.chat.id;
            const params = {
                data: {
                    checked_flats: [],
                },
            };
            await strapi.entityService.update('api::telegram-user.telegram-user', msg.user.id, params);
            await strapi.bots.alanyaBot.sendMessage(chatId, 'Выберите подгруппу', {
                reply_markup: {
                    keyboard: [[userLang().SEARCH_FLATS, userLang().SEARCH_CARS]],
                },
            });
            return await commands.SEARCH_CARS.fn(msg);
        },
    },
};

const inlineCallBacks = {
    NEXT: async (query) => {
        const chatId = query.message.chat.id;

        if (!query.user) return;

        await strapi.bots.alanyaBot.deleteMessage(chatId, query.message.message_id);
        return await commands[`SEARCH_${query.data.type}`].fn({
            ...query.message,
            from: query.from,
            user: query.user,
        });
    },
    SAVE: async (query) => {
        if (!query.user) return;
        await recommendations.save({
            filter: {
                where: {
                    key: 'telegramID',
                    value: query.from.id,
                },
                apiKey: 'api::telegram-user.telegram-user',
            },
            data: query.data,
            user: query.user,
        });

        await strapi.bots.alanyaBot.sendMessage(query.message.chat.id, userLang().SAVED, {
            reply_markup: {
                keyboard: [[userLang().FAVORITE, userLang().SEARCH]],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        });

        return await commands[`SEARCH_${query.data.type}`].fn({
            ...query.message,
            from: query.from,
            user: query.user,
        });
    },
    WRITE_AGENT: {},
};

/**
 * to send mach photos
 */
// for (let layout of photo.layoutPhoto) {
//   arrOfPhoto.push({
//     ...layout.formats.thumbnail,
//     media: `/Users/ysset/WebstormProjects/tgBotStrapi/public${layout.formats.medium.url}`,
//     type: 'photo'
//   });
// }

module.exports = {
    commands,
    inlineCallBacks,
};
