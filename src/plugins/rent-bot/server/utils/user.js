const { userLang } = require('../localisation');

/**
 * @param msg
 * @returns {Promise<{chatId: *, messageId: *, user: any}>}
 */
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

/**
 * @param msg
 * @returns {Promise<{msg, chatId: *, localisation: *, messageId: *, reply: (function(*, *=): TelegramBot.Promise), delete: (function(*=): TelegramBot.Promise), user: *}>}
 */
const modifyRequestWithUserData = async ({ msg }) => {
    let { user, messageId, chatId } = await getUser(msg);

    if (!user)
        user = await strapi.entityService
            .create('api::telegram-user.telegram-user', {
                data: {
                    telegramID: msg.from.id,
                    language: msg.from.language_code,
                    username: msg.from.username,
                },
            })
            .catch(console.error);

    if (user && !user.username && msg.from.username) {
        user = await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
            data: { username: msg.from.username },
        });
    }

    if (user && !msg.from.username) {
        user = await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
            data: { username: null },
        });
    }

    return {
        reply: (text, form = {}) => strapi.bots.rent.sendMessage(chatId, text, form),
        delete: (form = {}) => strapi.bots.rent.deleteMessage(chatId, messageId, form),
        msg,
        user,
        localisation: userLang(user.language),
        messageId,
        chatId,
    };
};
/**
 * @type {{modifyRequestWithUserData: (function({msg: *}): Promise<*&{chatId: *, localisation: *, messageId: *, user: *}>), getUser: (function(*): Promise<{chatId: *, messageId: *, user: any}>)}}
 */
module.exports = {
    modifyRequestWithUserData,
    getUser,
};
