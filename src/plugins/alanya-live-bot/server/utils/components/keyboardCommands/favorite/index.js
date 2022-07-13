const { localisation, userLang } = require('../../../../../../botUtils/botsLanguages');

module.exports = async (msg) => {
    localisation.current = msg.from.language_code;
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
};
