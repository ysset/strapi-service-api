const { userLang } = require('../../../../botUtils/language');
const getUser = require('../../../../botUtils/userController/index');

module.exports = async (msg) => {
    const messageId = msg.message?.message_id || msg.message_id;
    const user = await getUser({ msg });
    const localisation = userLang(msg.from.language_code);
    await strapi.bots.alanyaBot.deleteMessage(user.telegramID, messageId);

    await strapi.bots.alanyaBot.sendMessage(user.telegramID, localisation?.WELCOME, {
        reply_markup: {
            inline_keyboard: [
                [
                    // {
                    //     ...localisation?.FAVORITE,
                    //     callback_data: JSON.stringify({
                    //         action: 'FAVORITE',
                    //     }),
                    // },
                    // {
                    //     ...localisation?.SEARCH,
                    //     callback_data: JSON.stringify({
                    //         action: 'SEARCH',
                    //     }),
                    // },
                ],
            ],
        },
    });
};
