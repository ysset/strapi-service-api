module.exports = async (query) => {
    const { localisation, chatId } = query;

    return await strapi.bots.alanyaBot
        .sendMessage(chatId, 'Выберите фильтры', {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Search',
                            web_app: { url: 'http://192.168.1.174:3000' },
                        },
                    ],
                    // [
                    //     {
                    //         ...localisation.GO_BACK_ACTION,
                    //         callback_data: JSON.stringify({
                    //             action: 'ENTER_COMMAND',
                    //         }),
                    //     },
                    // ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });
};
