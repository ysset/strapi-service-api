const { userLang } = require('../localisation');
const getUserInfo = require('../utils/event/getUserInfo');

const getUser = async (msg) => {
    const messageId = msg.message?.message_id || msg.message_id;
    const userID = msg.from?.id;

    const user = await strapi.db
        .query('api::telegram-user.telegram-user')
        .findOne({
            where: {
                telegramID: parseInt(userID),
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

const modifyRequestWithUserData = async ({ msg, bot }) => {
    let { user, messageId, chatId } = await getUser(msg);
    if (!bot) throw Error('Bot is undefined');
    if (msg.web_app_data) {
        msg.filters = JSON.parse(msg.web_app_data.data);
    }
    if (!user)
        user = await strapi.entityService
            .create('api::agent.agent', {
                data: {
                    telegramID: msg.from.id,
                    language: 'ru',
                    username: msg.from.username,
                },
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

    bot.reply = (text, form = {}) => bot.sendMessage(chatId, text, form);
    bot.delete = (form = {}) => bot.deleteMessage(chatId, messageId, form);
    bot.deleteById = (messageId, form = {}) => bot.deleteMessage(chatId, messageId, form);
    bot.msg = msg;
    bot.user = user;
    bot.data = msg.data;
    bot.chatId = chatId;
    bot.messageId = messageId;
    bot.localisation = userLang(bot);

    const limit =
        (user.watchedVilla?.length || 0) +
        (user.watchedOwner?.length || 0) +
        (user.watchedComplex?.length || 0) +
        (user.watchedRent?.length || 0);
    if (limit >= 5 && !user.phoneNumber) {
        await getUserInfo(bot);
    }

    return bot;
};

module.exports = {
    modifyRequestWithUserData,
    getUser,
};
