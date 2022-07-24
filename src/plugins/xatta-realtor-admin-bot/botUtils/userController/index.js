const { userLang } = require('../../botUtils/language');

/**
 * @param msg
 * @returns {Promise<(*&{localisation: *, user: *})|any>}
 */
module.exports = async ({ msg }) => {
    let user = await strapi.db.query('api::agent.agent').findOne({
        where: {
            telegramID: msg.from.id,
        },
        populate: true,
    });

    if (!user)
        user = await strapi.entityService.create('api::agent.agent', {
            data: {
                telegramID: msg.from.id,
                language: msg.from.language_code,
                username: msg.from.username,
            },
        });

    //try to parse data from callback query
    if (msg.data) {
        try {
            msg.data = JSON.parse(msg.data);
        } catch (e) {
            console.error(e);
        }
    }

    return {
        ...msg,
        user,
        localisation: userLang(user.language),
    };
};
