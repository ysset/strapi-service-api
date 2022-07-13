const { localisation, userLang } = require('../../../../../botUtils/botsLanguages');

module.exports = async (query) => {
    localisation.current = query.from.language_code;
    const chatId = query.message?.chat.id || query.chat.id;

    return await strapi.bots.alanyaBot.sendMessage(chatId, 'Выберите подгруппу', {
        reply_markup: {
            inline_keyboard: [
                [
                    // userLang().FAVORITE_CARS,
                    {
                        ...userLang().FAVORITE_FLATS,
                        callback_data: JSON.stringify({
                            action: 'FAVORITE_FLATS',
                        }),
                    },
                ],
            ],
        },
    });
};
