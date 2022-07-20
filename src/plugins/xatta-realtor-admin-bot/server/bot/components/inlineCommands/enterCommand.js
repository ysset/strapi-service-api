const { userLang } = require('../../../../botUtils/language');
const getUser = require('../../../../botUtils/userController/index');
const createNewAuthor = require('../../../../botUtils/userController/createNewAuthor');

const sendWelcomMessage = async ({ user, localisation }) => {
    await strapi.bots.admin.sendMessage(user.telegramID, localisation?.WELCOME, {
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

module.exports = async (msg) => {
    const user = await getUser({ msg });
    const localisation = userLang(user.language);
    const messageId = msg.message?.message_id || msg.message_id;
    await strapi.bots.admin.deleteMessage(user.telegramID, messageId);

    await createNewAuthor(msg);

    return sendWelcomMessage({ user, localisation });
};
