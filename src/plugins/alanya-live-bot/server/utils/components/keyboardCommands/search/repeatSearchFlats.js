const getUser = require('../../../../../../botUtils/userController');
const searchFlatsFunc = require('./searchFlats');

module.exports = async (msg) => {
    const params = {
        data: {
            checked_flats: [],
        },
    };

    await strapi.entityService.update('api::telegram-user.telegram-user', msg.user.id, params).catch((e) => {
        console.log(e);
    });
    msg.user = await getUser({ msg });
    return await searchFlatsFunc(msg);
};
