const { userLang } = require('../../../../botUtils/botsLanguages');
const infinityQueue = require('../../../../botUtils/botManager/recomendationManager');
const recommendations = new infinityQueue();
const {
    favorite,
    favoriteCars,
    favoriteFlats,
    researchFlat,
    searchFlats,
    search,
    researchCars,
    searchCars,
} = require('./keyboardCommands');

const { writeAgent } = require('./inlineCommands');

const commands = {
    FAVORITE: favorite,
    FAVORITE_CARS: favoriteCars,
    FAVORITE_FLATS: favoriteFlats,
    SEARCH: search,
    SEARCH_FLATS: searchFlats,
    REPEAT_SEARCH_FLATS: researchFlat,
    SEARCH_CARS: searchCars,
    REPEAT_SEARCH_CARS: researchCars,
    inlineCallBacks: {
        NEXT: async (query) => {
            if (!query.user) return;

            const chatId = query.message.chat.id;

            await strapi.bots.alanyaBot.deleteMessage(chatId, query.message.message_id);

            return await commands[`SEARCH_${query.data.type}`]({
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

            return await commands[`SEARCH_${query.data.type}`]({
                ...query.message,
                from: query.from,
                user: query.user,
            });
        },

        WRITE_AGENT: writeAgent,
    },
};

module.exports = commands;
