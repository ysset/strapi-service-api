const { localisation, userLang } = require('../../../../botUtils/botsLanguages');
const getUser = require('../../../../botUtils/userController');
const callbacks = require('./componentList');

const index = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            const chatId = msg.chat.id;
            const messageId = msg.message_id;
            const user = await getUser({ msg });

            Object.keys(index).forEach((key) => {
                index[key].regex = userLang()[key].regex;
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
            if (localisation.currentLang) {
                for (const command in index) {
                    strapi.bots.alanyaBot.onText(index[command].regex, async (msg) =>
                        index[command].fn({ ...msg, user: await getUser({ msg }) })
                    );
                }
            }
        },
    },

    FAVORITE: {
        regex: userLang()?.FAVORITE.regex,
        fn: callbacks.FAVORITE,
    },

    FAVORITE_CARS: {
        regex: userLang()?.FAVORITE_CARS.regex,
        fn: callbacks.FAVORITE_CARS,
    },

    FAVORITE_FLATS: {
        regex: userLang()?.FAVORITE_FLATS.regex,
        fn: callbacks.FAVORITE_FLATS,
    },

    SEARCH: {
        regex: userLang()?.SEARCH.regex,
        fn: callbacks.SEARCH,
    },

    SEARCH_FLATS: {
        regex: userLang()?.SEARCH_FLATS.regex,
        fn: callbacks.SEARCH_FLATS,
    },

    REPEAT_SEARCH_FLATS: {
        regex: userLang()?.REPEAT_SEARCH_FLATS.regex,
        fn: callbacks.REPEAT_SEARCH_FLATS,
    },

    SEARCH_CARS: {
        regex: userLang()?.SEARCH_CARS.regex,
        fn: callbacks.SEARCH_CARS,
    },

    REPEAT_SEARCH_CARS: {
        regex: userLang()?.REPEAT_SEARCH_CARS.regex,
        fn: callbacks.REPEAT_SEARCH_CARS,
    },
};

const inlineCallBacks = {
    NEXT: callbacks.inlineCallBacks.NEXT,
    SAVE: callbacks.inlineCallBacks.SAVE,
    WRITE_AGENT: callbacks.inlineCallBacks.WRITE_AGENT,
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
    commands: index,
    inlineCallBacks,
};
