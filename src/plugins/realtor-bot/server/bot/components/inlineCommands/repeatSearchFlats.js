const deleteCurrentMessage = require('./deleteCurrentMessage');
const searchFlats = require('./searchFlats');

module.exports = async (query) => {
    await strapi.entityService
        .update('api::telegram-user.telegram-user', query.user.id, {
            data: {
                watchedComplex: [],
                watchedVilla: [],
                watchedOwner: [],
            },
        })
        .catch(console.error);
    await deleteCurrentMessage(query);
    await searchFlats(query);
};
