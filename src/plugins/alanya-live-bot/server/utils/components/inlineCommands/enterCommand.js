const { userLang } = require('../../../../../botUtils/botsLanguages');
const getUser = require('../../../../../botUtils/userController/index');

module.exports = async (msg) => {
    const chatId = msg.message?.chat.id || msg.chat.id;
    const messageId = msg.message?.message_id || msg.message_id;
    const user = await getUser({ msg });
    if (user.showPromo) {
        await strapi.bots.alanyaBot.sendMessage(chatId, userLang().FIRST_TIME_START_PRESS.text);
        await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
            data: {
                showPromo: false,
            },
        });
    }

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

    await strapi.bots.alanyaBot.sendMessage(chatId, userLang().WELCOME.alanyaBot, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...userLang().FAVORITE,
                        callback_data: JSON.stringify({
                            action: 'FAVORITE',
                        }),
                    },
                    {
                        ...userLang().SEARCH,
                        callback_data: JSON.stringify({
                            action: 'SEARCH',
                        }),
                    },
                ],
            ],
        },
    });
};
