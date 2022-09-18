const fullDescription = require('./fullDescription');
const deleteMessage = require('./deleteCurrentMessage');
const actions = require('../actions');

module.exports = async (query) => {
    const {
        localisation,
        chatId,
        data: { table, flatId },
    } = query;

    const caption = await fullDescription(query);

    await strapi.bots.alanyaBot
        .sendMessage(chatId, caption, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.WRITE_INLINE[caption.table],
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_WRITE_AGENT,
                                table,
                                flatId,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.NEXT_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.NEXT_FLAT,
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
