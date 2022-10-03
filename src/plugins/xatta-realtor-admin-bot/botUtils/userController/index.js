const { userLang } = require('../../botUtils/language');

/**
 * @param msg
 * @returns {Promise<{chatId: *, messageId: *, user: *}>}
 */
const getUser = async (msg) => {
    const messageId = msg.message?.message_id || msg.message_id;
    const userID = msg.from?.id;

    const user = await strapi.db
        .query('api::agent.agent')
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
 * @returns {Promise<*&{chatId: *, localisation: *, messageId: *, user: *}>}
 */
const modifyRequestWithUserData = async ({ msg }) => {
    let { user, messageId, chatId } = await getUser(msg);

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
            .update('api::agent.agent', user.id, {
                data: { username: msg.from.username },
                populate: '*',
            })
            .catch(console.error);

    if (user && !msg.from.username)
        user = await strapi.entityService
            .update('api::agent.agent', user.id, {
                data: { username: null },
                populate: '*',
            })
            .catch(console.error);

    if (user && user.username !== msg.from.username)
        user = await strapi.entityService
            .update('api::agent.agent', user.id, {
                data: { username: msg.from.username },
                populate: '*',
            })
            .catch(console.error);

    return {
        ...msg,
        user,
        localisation: userLang('ru'),
        messageId,
        chatId,
    };
};
/**
 * @type {{modifyRequestWithUserData: (function({msg: *}): Promise<*&{chatId: *, localisation: *, messageId: *, user: *}>), getUser: (function(*): Promise<{chatId: *, messageId: *, user: *}>)}}
 */
module.exports = {
    modifyRequestWithUserData,
    getUser,
};
