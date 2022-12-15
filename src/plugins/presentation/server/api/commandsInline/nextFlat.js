const searchFlats = require('./searchFlats');

module.exports = async (bot) => {
    const { table } = bot.data;
    const { localisation, chatId, messageId } = bot;
    await bot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    {
                        ...localisation?.SAVE_INLINE,
                        callback_data: JSON.stringify(''),
                    },
                ],
                [
                    {
                        ...localisation?.FULL_DESCRIPTION,
                        callback_data: JSON.stringify(''),
                    },
                ],
                [
                    {
                        ...localisation?.WRITE_INLINE[table.toLowerCase()],
                        callback_data: JSON.stringify(''),
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
