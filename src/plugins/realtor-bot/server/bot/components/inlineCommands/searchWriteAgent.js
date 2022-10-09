const actions = require('../actions');
const writeAgent = require('./writeAgent');
const { alanyaBot } = require('../../../../botUtils/errorHandlers');

module.exports = async (query) => {
    const { localisation, data, chatId, messageId, user } = query;

    if (!process.env.DEVELOPMENT && !user.username) return alanyaBot.NO_USERNAME(query);

    const { table, flatId } = data;
    strapi.bots.alanyaBot
        .editMessageReplyMarkup(
            {
                inline_keyboard: [
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
                            ...localisation.COMPLETE_SEARCHING,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FLATS,
                                table,
                            }),
                        },
                    ],
                ],
            },
            {
                chat_id: chatId,
                message_id: messageId,
            }
        )
        .catch(console.error);
    await writeAgent(query);
};
