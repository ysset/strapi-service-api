const { userLang } = require('../../../../botUtils/botsLanguages');
const infinityQueue = require('../../../../botUtils/botManager/recomendationManager');
const recommendations = new infinityQueue();
const axios = require('axios');
const {
    favorite,
    favoriteCars,
    favoriteFlats,
    researchFlat,
    searchFlats,
    search,
    researchCars,
    searchCars,
} = require('../components/keyBoardCommands');

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
            const chatId = query.message.chat.id;

            if (!query.user) return;

            await strapi.bots.alanyaBot.deleteMessage(chatId, query.message.message_id);
            console.log(`SEARCH_${query.data.type}`);
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
        WRITE_AGENT: async (query) => {
            const api = query.data.recommendationKey.split('/')[0];
            const recommendationId = query.data.recommendationKey.split('/')[1];
            const [recommendation] = await strapi.entityService.findMany(api, {
                where: {
                    id: recommendationId,
                },
                populate: '*',
            });
            console.log(query);
            const userTelegramId = query.from.id;
            const userFirstName = query.from.first_name;
            const agentFirstName = recommendation.agent.agentUsername;
            const agentTelegramId = recommendation.agent.telegramId;
            const chatTitle = `Address: ${recommendation.address}`;
            axios({
                url: 'https://1337-ysset-telegramapi-2junh60whyn.ws-eu43.gitpod.io/api/create/flatchat',
                method: 'POST',
                data: {
                    userId: userTelegramId,
                    agentId: agentTelegramId,
                    title: chatTitle,
                    description: chatTitle,
                    userFirstName,
                    agentFirstName,
                },
            });
        },
    },
};

module.exports = commands;
