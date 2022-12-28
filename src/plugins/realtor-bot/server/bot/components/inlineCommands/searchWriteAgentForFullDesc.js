const writeAgent = require('./writeAgent');
const { getUser, getUserInfo } = require('../../../../../utils');
const searchFlatById = require('./searchFlatById');

module.exports = async (bot) => {
    const { messageId } = bot;

    const { user } = await getUser(bot.msg);

    if (!process.env.DEVELOPMENT && !user.phoneNumber) {
        await getUserInfo(bot);
    }

    const [history] = await strapi.entityService.findMany('api::message-history.message-history', {
        filters: { callbackMessage: parseInt(messageId) },
        populate: '*',
    });
    for (const { messageId } of history.messages) {
        await bot.deleteById(messageId);
    }
    await bot.delete();
    await searchFlatById(bot, true);

    await writeAgent(bot);
};
