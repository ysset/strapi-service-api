const { userLang } = require('../../../../../botUtils/language');
const getUser = require('../../../../../botUtils/userController/index');

module.exports = async (msg) => {
    const chatId = msg.message?.chat.id || msg.chat.id;
    const messageId = msg.message?.message_id || msg.message_id;
    const user = await getUser({ msg });
    const localisation = userLang(msg.from.language_code);

    if (user.showPromo) {
        await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.FIRST_TIME_START_PRESS.text);
        await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
            data: {
                showPromo: false,
            },
        });
    }

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

    await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.WELCOME.alanyaBot, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...localisation?.FAVORITE,
                        callback_data: JSON.stringify({
                            action: 'FAVORITE',
                        }),
                    },
                    {
                        ...localisation?.SEARCH,
                        callback_data: JSON.stringify({
                            action: 'SEARCH',
                        }),
                    },
                ],
            ],
        },
    });
};
