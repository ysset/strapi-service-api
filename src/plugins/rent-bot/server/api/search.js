const { searchByFilters } = require('../utils/search');
const { noFlats } = require('../errorHandlers');

module.exports = async (bot) => {
    const recommendation = await searchByFilters(bot);
    if (!recommendation) return await noFlats(bot);
};
