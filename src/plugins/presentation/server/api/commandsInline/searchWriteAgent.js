const actions = require('../../../../utils/actions');
const writeAgent = require('./writeAgent');
const { getUser } = require('../../utils/user');
const getUserInfo = require('../../utils/getUserInfo');

module.exports = async (bot) => {
    const { localisation, data, chatId, messageId } = bot;

    const { user } = await getUser(bot.msg);

    if (!process.env.DEVELOPMENT && !user.phoneNumber) {
        await getUserInfo(bot);
    }
    const { table } = data;
    bot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    {
                        ...localisation?.FULL_DESCRIPTION,
                    },
                ],
                [
                    {
                        ...localisation.COMPLETE_SEARCHING,
                        callback_data: JSON.stringify({
                            action: actions.presentation.SEARCH_FLATS,
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
    ).catch(console.error);
    await writeAgent(bot);
};
