module.exports = async (query) => {
    const { localisation, chatId } = query;

    return await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation.SELECT_SUBGROUP.text, {
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
