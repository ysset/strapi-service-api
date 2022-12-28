const writeAgent = require('./writeAgent');
const { getUser } = require('../../utils/user');
const getUserInfo = require('../../utils/getUserInfo');

module.exports = async (bot) => {
    const { localisation, chatId, messageId } = bot;

    const { user } = await getUser(bot.msg);

    if (!process.env.DEVELOPMENT && !user.phoneNumber) {
        await getUserInfo(bot);
    }
    bot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    {
                        ...localisation?.FULL_DESCRIPTION,
                        callback_data: JSON.stringify(''),
                    },
                ],
                [
                    {
                        ...localisation.CONTINUE_SEARCHING,
                        callback_data: JSON.stringify(''),
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
