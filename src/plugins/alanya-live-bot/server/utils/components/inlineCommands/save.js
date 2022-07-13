const { userLang } = require('../../../../../botUtils/botsLanguages');
const recommendations = require('../../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
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
};
