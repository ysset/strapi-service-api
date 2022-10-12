const actions = require('../actions');
const writeAgent = require('./writeAgent');
const getUserInfo = require('../../../../botUtils/events/getUserInfo');
const { getUser } = require('../../../../botUtils/userController');

module.exports = async (bot) => {
    const { localisation, data, chatId, messageId } = bot;

    if (!process.env.DEVELOPMENT && (!bot.user.phoneNumber || !bot.user.fullName)) {
        await getUserInfo(bot);
    }

    const { user } = await getUser(bot);

    if (!process.env.DEVELOPMENT && (!user.phoneNumber || !user.fullName)) {
        return;
    }

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
    await writeAgent(bot);
};
