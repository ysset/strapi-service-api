const searchFlats = require('./searchFlats');
const searchFlatById = require('./searchFlatById');

module.exports = async (bot) => {
    const { messageId: callbackMessage } = bot;
    const [history] = await strapi.entityService.findMany('api::message-history.message-history', {
        filters: { callbackMessage: parseInt(callbackMessage) },
        populate: '*',
    });

    for (const { messageId } of history.messages) {
        await bot.deleteById(messageId);
    }

    await bot.delete();
    await searchFlatById(bot);
    return searchFlats(bot);
};
