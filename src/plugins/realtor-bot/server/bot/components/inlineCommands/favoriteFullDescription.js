const fullDescription = require('./fullDescription');
const actions = require('../actions');

module.exports = async (bot) => {
    const {
        localisation,
        chatId,
        data: { table, flatId },
    } = bot;
    const { caption } = await fullDescription(bot);

    await strapi.bots.alanyaBot
        .sendMessage(chatId, caption, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.WRITE_INLINE[table.toLowerCase()],
                            callback_data: JSON.stringify({
                                action: actions.FAVORITE_WRITE_AGENT,
                                table,
                                flatId,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch(console.error);

    bot.delete();
};
