const { userLang } = require('../../botUtils/language');

/**
 * @param msg
 * @returns {Promise<*&{chatId: *, localisation: *, messageId: *, user: *}>}
 */
module.exports = async ({ msg }) => {
    const chatId = msg.message?.chat.id || msg.chat.id;
    const messageId = msg.message?.message_id || msg.message_id;

    let user = await strapi.db
        .query('api::telegram-user.telegram-user')
        .findOne({
            where: {
                telegramID: msg.from.id,
            },
            populate: true,
        })
        .catch((e) => {
            console.error(e);
        });

    if (!user)
        user = await strapi.entityService
            .create('api::telegram-user.telegram-user', {
                data: {
                    telegramID: msg.from.id,
                    language: msg.from.language_code,
                    username: msg.from.username,
                },
            })
            .catch((e) => {
                console.error(e);
            });

    return {
        ...msg,
        user,
        localisation: userLang(user.language),
        messageId,
        chatId,
    };
};
