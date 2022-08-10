const deleteCurrentMessage = require('./deleteCurrentMessage');
const searchFlats = require('./searchFlats');

module.exports = async (query) => {
    await strapi.entityService
        .update('api::telegram-user.telegram-user', query.user.id, {
            data: {
                watchedComplex: [],
                watchedVilla: [],
            },
        })
        .catch((e) => {
            console.log(e);
        })
        .catch((e) => {
            console.error(e);
        });
    await deleteCurrentMessage(query);
    await searchFlats(query);
};
