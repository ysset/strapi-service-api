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
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.WRITE_INLINE[table.toLowerCase()],
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
                    [
                        {
                            ...localisation.CONTROL_PANEL,
                            web_app: { url: process.env.WEB_APP_URL },
                        },
                    ],
                ],
            },
        })
        .catch(console.error);

    deleteMessage(query);
};
