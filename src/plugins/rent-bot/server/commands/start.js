const { enter } = require('../api');
const { noUsername } = require('../errorHandlers');

module.exports = async (msg) => {
    if (!process.env.DEVELOPMENT && !msg.user.username) return noUsername(msg);
    await enter(msg);
};
