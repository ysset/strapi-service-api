const { userLang } = require('../botsLanguages');
module.exports = {
    alanyaBot: {
        NO_FLATS: async (chatId) =>
            strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_FLATS, {
                reply_markup: {
                    keyboard: [[userLang().FAVORITE, userLang().REPEAT_SEARCH_FLATS, userLang().SEARCH_CARS]],
                },
            }),
        NO_CARS: async (chatId) =>
            strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_CARS, {
                reply_markup: {
                    keyboard: [[userLang().FAVORITE, userLang().REPEAT_SEARCH_CARS, userLang().SEARCH_FLATS]],
                },
            }),
        SERVER_ERROR: async (chatId) =>
            strapi.bots.alanyaBot.sendMessage(chatId, userLang().SERVER_ERROR, {
                reply_markup: {
                    keyboard: [[userLang().FAVORITE]],
                },
            }),
    },
    drInvest: {
        NO_FLATS: async (chatId) => strapi.bots.drInvest.sendMessage(chatId, userLang().NO_FLATS),
        NO_CARS: async (chatId) => strapi.bots.drInvest.sendMessage(chatId, userLang().NO_CARS),
        SERVER_ERROR: async (chatId) => strapi.bots.drInvest.sendMessage(chatId, userLang().SERVER_ERROR),
    },
};
