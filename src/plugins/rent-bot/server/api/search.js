const { searchByFilters } = require('../utils/search');
const { noFlats } = require('../errorHandlers');
const sendObject = require('./sendObjectShortDescription');

module.exports = async (bot) => {
    const object = await searchByFilters(bot);
    if (!object) return await noFlats(bot);
    await sendObject({ bot, object });
};
