const actions = require('../actions');
const writeAgent = require('./writeAgent');
const getUserInfo = require('../../../../botUtils/events/getUserInfo');
const { getUser } = require('../../../../botUtils/userController');

module.exports = async (bot) => {
    const { localisation, data, chatId, messageId } = bot;

    if (!process.env.DEVELOPMENT && (!bot.user.fullName || !bot.user.phoneNumber)) {
        await getUserInfo(bot);
    }

    const { user } = await getUser(bot);

    if (!process.env.DEVELOPMENT && (!user.fullName || !user.phoneNumber)) {
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
                                action: actions.FAVORITE_FULL_DESCRIPTION,
                                table,
                                flatId,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation.SEARCH,
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
