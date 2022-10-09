const fullDescription = require('./fullDescription');
const deleteMessage = require('./deleteCurrentMessage');
const actions = require('../actions');

module.exports = async (query) => {
    const {
        localisation,
        chatId,
        data: { table, flatId },
    } = query;
    const { caption } = await fullDescription(query);

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

    deleteMessage(query);
};
