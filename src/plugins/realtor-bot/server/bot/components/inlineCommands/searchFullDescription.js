const fullDescription = require('./fullDescription');
const deleteMessage = require('./deleteCurrentMessage');
const actions = require('../actions');

module.exports = async (query) => {
    const {
        localisation,
        chatId,
        data: { table, flatId },
    } = query;

    const { caption, messages } = await fullDescription(query);
    const { message_id: callbackMessage } = await strapi.bots.alanyaBot
        .sendMessage(chatId, caption, {
            parse_mode: 'HTML',
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
                            ...localisation?.SAVE_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SAVE,
                                table,
                                flatId,
                            }),
                        },
                        {
                            ...localisation?.NEXT_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SFDNF,
                                table,
                                flatId,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation.CONTROL_PANEL,
                            web_app: { url: process.env.REALTOR_WEB_APP_URL },
                        },
                    ],
                ],
            },
        })
        .catch(console.error);

    await strapi.entityService.create('api::message-history.message-history', {
        data: {
            flatInfo: `${table}/${flatId}`,
            callbackMessage,
            messages,
        },
        populate: '*',
    });
    deleteMessage(query);
};
