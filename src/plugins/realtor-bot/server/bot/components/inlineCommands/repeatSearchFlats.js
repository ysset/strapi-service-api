const searchFlats = require('./searchFlats');

module.exports = async (bot) => {
    await strapi.entityService
        .update('api::telegram-user.telegram-user', bot.user.id, {
            data: {
                watchedComplex: [],
                watchedVilla: [],
                watchedOwner: [],
            },
        })
        .catch(console.error);
    await bot.delete();
    await searchFlats(bot);
};
