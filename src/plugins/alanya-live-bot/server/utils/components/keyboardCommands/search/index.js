const { lang, userLang } = require('../../../../../../botUtils/botsLanguages');

module.exports = async (msg) => {
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
};
