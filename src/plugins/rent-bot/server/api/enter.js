const { getUserInfo } = require('../utils');
const deleteMessage = require('./deleteMessage');

module.exports = async (msg) => {
    const { localisation, chatId } = msg;

    await strapi.bots.rent.sendMessage(chatId, localisation.WELCOME.first);
    await strapi.bots.rent.sendMessage(chatId, localisation.WELCOME.second);
    await deleteMessage(msg);

    return getUserInfo(msg);
};
