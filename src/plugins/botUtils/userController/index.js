const { lang } = require('../botsLanguages');

module.exports = async ({ msg }) => {
    const user = await strapi.db.query('api::telegram-user.telegram-user').findOne({
        where: {
            telegramID: msg.from.id,
        },
        populate: true,
    });

    if (!user)
        await strapi.entityService.create('api::telegram-user.telegram-user', {
            data: {
                telegramID: msg.from.id,
                language: lang.currentLang,
                username: msg.from.username,
            },
        });

    lang.currentLang = msg.from.language_code;

    return user;
};