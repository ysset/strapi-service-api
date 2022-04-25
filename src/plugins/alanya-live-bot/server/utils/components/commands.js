const { lang, userLang } = require('../../../../botUtils/botsLanguages');
const infinityQueue = require('../../../../botUtils/botManager/recomendationManager');
const { alanyaBot } = require('../../../../botUtils/errorHandlers');
const getUser = require('../../../../botUtils/userController');
const path = require('path');
const fs = require('fs');
const recommendations = new infinityQueue();

const commands = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            const chatId = msg.chat.id;
            const messageId = msg.message_id;
            const user = await getUser({ msg });

            Object.keys(commands).forEach((key) => {
                commands[key].regex = userLang()[key].regex;
            });

            await strapi.bots.alanyaBot.clearTextListeners();
            if (user.showPromo) {
                await strapi.bots.alanyaBot.sendMessage(chatId, userLang().FIRST_TIME_START_PRESS.text);
                await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
                    data: {
                        showPromo: false,
                    },
                });
            }
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
                    strapi.bots.alanyaBot.onText(commands[command].regex, async (msg) =>
                        commands[command].fn({ ...msg, user: await getUser({ msg }) })
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
                let resolvedPath = path.resolve(`./index`);
                resolvedPath = resolvedPath.split('/');
                resolvedPath.pop();
                resolvedPath = resolvedPath.join('/');
                resolvedPath += `/public${
                    car.layoutPhoto[0].formats.medium
                        ? car.layoutPhoto[0].formats.medium.url
                        : car.layoutPhoto[0].formats.thumbnail.url
                }`;
                console.log(resolvedPath);
                const stream = fs.createReadStream(resolvedPath);
                await strapi.bots.alanyaBot.sendPhoto(chatId, stream, {
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
                });
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
                let resolvedPath = path.resolve(`./index`);
                resolvedPath = resolvedPath.split('/');
                resolvedPath.pop();
                resolvedPath = resolvedPath.join('/');
                resolvedPath += `/public${
                    flat.layoutPhoto[0].formats.medium
                        ? flat.layoutPhoto[0].formats.medium.url
                        : flat.layoutPhoto[0].formats.thumbnail.url
                }`;
                console.log(resolvedPath);
                const stream = fs.createReadStream(resolvedPath);
                await strapi.bots.alanyaBot.sendPhoto(chatId, stream, {
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
                });
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
            let resolvedPath = path.resolve(`./index`);
            resolvedPath = resolvedPath.split('/');
            resolvedPath.pop();
            resolvedPath = resolvedPath.join('/');
            resolvedPath += `/public${
                photo[0].formats.medium ? photo[0].formats.medium.url : photo[0].formats.thumbnail.url
            }`;
            console.log(resolvedPath);
            const stream = fs.createReadStream(resolvedPath);

            await strapi.bots.alanyaBot.sendPhoto(chatId, stream, {
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
                                // url: 'https://t.me/Katabxre',
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
            msg.user = await getUser({ msg });
            return await commands.SEARCH_FLATS.fn(msg);
        },
    },

    SEARCH_CARS: {
        regex: userLang()?.SEARCH_CARS.regex,
        fn: async (msg) => {
            const chatId = msg.chat.id;

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
            let resolvedPath = path.resolve(`./index`);
            resolvedPath = resolvedPath.split('/');
            resolvedPath.pop();
            resolvedPath = resolvedPath.join('/');
            resolvedPath += `/public${
                photo[0].formats.medium ? photo[0].formats.medium.url : photo[0].formats.thumbnail.url
            }`;
            console.log(resolvedPath);
            const stream = fs.createReadStream(resolvedPath);

            await strapi.bots.alanyaBot.sendPhoto(chatId, stream, {
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
            msg.user = await getUser({ msg });
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
    WRITE_AGENT: async (query) => {
        console.log(query);
        await strapi.bots.alanyaBot.forwardMessage('541464348', query.from.id, query.message.message_id);
    },
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
