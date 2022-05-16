const { userLang } = require('../../../../../../botUtils/botsLanguages');
const getUser = require('../../../../../../botUtils/userController');
const searchCarsFunc = require('./searchCars');

module.exports = async (msg) => {
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
    return await searchCarsFunc;
};
