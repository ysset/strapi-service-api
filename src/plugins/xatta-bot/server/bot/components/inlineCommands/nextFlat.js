const searchFlats = require('./searchFlats');
const actions = require('../actions');

module.exports = async (query) => {
    const { table, flatId } = query.data;
    const { localisation, chatId, messageId } = query;
    await strapi.bots.alanyaBot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    {
                        ...localisation?.WRITE_AGENT_INLINE,
                        callback_data: JSON.stringify({
                            action: actions.SEARCH_WRITE_AGENT,
                            table,
                            flatId,
                        }),
                    },
                ],
            ],
        },
        {
            chat_id: chatId,
            message_id: messageId,
        }
    );
    return searchFlats(query);
};
