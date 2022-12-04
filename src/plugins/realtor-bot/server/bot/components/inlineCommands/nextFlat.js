const searchFlats = require('./searchFlats');
const actions = require('../actions');

module.exports = async (bot) => {
    const { table, flatId } = bot.data;
    const { localisation, chatId, messageId } = bot;
    await bot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    {
                        ...localisation?.SAVE_INLINE,
                        callback_data: JSON.stringify({
                            action: actions.SAVE,
                            table,
                            flatId,
                        }),
                    },
                ],
                [
                    {
                        ...localisation?.FULL_DESCRIPTION,
                        callback_data: JSON.stringify({
                            action: actions.SEARCH_FULL_DESCRIPTION,
                            table,
                            flatId,
                        }),
                    },
                ],
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
            ],
        },
        {
            chat_id: chatId,
            message_id: messageId,
        }
    );
    return searchFlats(bot);
};
