const getUser = require('../../../../botUtils/userController');
const searchFlatsFunc = require('./searchFlats');

module.exports = async (query) => {
    const chatId = query.message?.chat.id || query.chat.id;
    const messageId = query.message?.message_id || query.message_id;
    const params = {
        data: {
            checked_flats: [],
        },
    };

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

    await strapi.entityService
        .update('api::telegram-user.telegram-user', query.user.id, params)
        .catch((e) => {
            console.log(e);
        });
    query.user = await getUser({ msg: query });
    return await searchFlatsFunc(query);
};
