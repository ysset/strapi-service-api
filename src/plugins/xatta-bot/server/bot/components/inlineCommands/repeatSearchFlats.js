const deleteMessage = require('./deleteCurrentMessage');

module.exports = async (query) => {
    await strapi.entityService
        .update('api::telegram-user.telegram-user', query.user.id, {
            data: {
                watchedHousings: [],
            },
        })
        .catch((e) => {
            console.log(e);
        })
        .catch((e) => {
            console.error(e);
        });
    await deleteMessage(query);
};
