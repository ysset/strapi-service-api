const recommendations = require('../../../../botUtils/botManager/recomendationManager');
const { getUser } = require('../../../../botUtils/userController');

module.exports = async (query) => {
    const { user } = await getUser(query);
    const { chatId, data, localisation, messageId } = query;
    const [flatTable, flatId] = data.flatInfo.split('/');

    if (!user) return;

    await recommendations.remove({
        filter: {
            where: {
                id: flatId,
            },
            apiKey: `api::${flatTable}.${flatTable}`,
        },
        flatTable,
        flatId,
        user,
    });

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);

    return await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation.DELETED.text, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.FAVORITE_HOUSINGS,
                            callback_data: JSON.stringify({
                                action: 'FAVORITE_HOUSINGS',
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.GO_BACK_ACTION,
                            callback_data: JSON.stringify({
                                action: 'ENTER_COMMAND',
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });
};
