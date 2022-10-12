const actions = require('../actions');
const writeAgent = require('./writeAgent');
const getUserInfo = require('../../../../botUtils/events/getUserInfo');
const { getUser } = require('../../../../botUtils/userController');

module.exports = async (bot) => {
    let { localisation, data, chatId, messageId, user } = bot;

    if (!process.env.DEVELOPMENT && !user.username) {
        await getUserInfo(bot);
    }

    user = await getUser(bot);

    if (!process.env.DEVELOPMENT && !user.username) {
        return await bot.reply(localisation.CANCEL_INTEREST.user);
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
