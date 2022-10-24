const { userLang } = require('../../botUtils/language');

const getUser = async (msg) => {
    const messageId = msg.message?.message_id || msg.message_id;
    const userID = msg.from?.id;

    const user = await strapi.db
        .query('api::telegram-user.telegram-user')
        .findOne({
            where: {
                telegramID: userID,
            },
            populate: true,
        })
        .catch(console.error);

    return {
        chatId: userID,
        messageId,
        user,
    };
};

const modifyRequestWithUserData = async ({ msg }) => {
    let { user, messageId, chatId } = await getUser(msg);

    if (!user)
        user = await strapi.entityService
            .create('api::telegram-user.telegram-user', {
                data: {
                    telegramID: msg.from.id,
                    language: 'ru',
                    username: msg.from.username,
                },
                populate: '*',
            })
            .catch(console.error);

    if (user && !user.username && msg.from.username)
        user = await strapi.entityService
            .update('api::telegram-user.telegram-user', user.id, {
                data: { username: msg.from.username },
                populate: '*',
            })
            .catch(console.error);

    if (user && !msg.from.username)
        user = await strapi.entityService
            .update('api::telegram-user.telegram-user', user.id, {
                data: { username: null },
                populate: '*',
            })
            .catch(console.error);

    if (user && user.username !== msg.from.username)
        user = await strapi.entityService
            .update('api::telegram-user.telegram-user', user.id, {
                data: { username: msg.from.username },
                populate: '*',
            })
            .catch(console.error);

    return {
        reply: (text, form = {}) => strapi.bots.alanyaBot.sendMessage(chatId, text, form),
        delete: (form = {}) => strapi.bots.alanyaBot.deleteMessage(chatId, messageId, form),
        deleteById: (messageId, form = {}) => strapi.bots.alanyaBot.deleteMessage(chatId, messageId, form),
        ...msg,
        user,
        localisation: userLang('ru'),
        messageId,
        chatId,
    };
};

module.exports = {
    modifyRequestWithUserData,
    getUser,
};
