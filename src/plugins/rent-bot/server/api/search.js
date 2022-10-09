const { searchByFilters } = require('../utils/search');

module.exports = async (bot) => {
    const recommendation = await searchByFilters(bot);
    console.log(recommendation);
    // await bot.reply()
};
