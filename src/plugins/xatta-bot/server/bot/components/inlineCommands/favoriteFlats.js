const path = require('path');
const fs = require('fs');

module.exports = async (query) => {
    const { localisation, messageId, chatId } = query;
    const flats = await strapi.db
        .query('api::flat.flat')
        .findMany({
            where: {
                id: {
                    $in: query.user.favorite_flats.map((el) => el.id),
                },
            },
            populate: true,
        })
        .catch((e) => {
            console.error(e);
        });

    if (!query.user) return;
    if (query.user.favorite_flats.length === 0)
        return await strapi.bots.alanyaBot
            .editMessageText(localisation?.NO_FAVORITE_NOW, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                ...localisation?.SEARCH_FLATS,
                                callback_data: JSON.stringify({
                                    action: 'SEARCH_FLATS',
                                }),
                            },
                        ],
                        [
                            {
                                ...localisation?.GO_BACK_ACTION,
                                callback_data: JSON.stringify({
                                    action: 'FAVORITE',
                                }),
                            },
                        ],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            })
            .catch((e) => {
                console.error(e);
            });

    await strapi.bots.alanyaBot.deleteMessage(chatId, messageId).catch((e) => {
        console.error(e);
    });

    for (const flat of flats) {
        let resolvedPath = path.resolve('./index');

        resolvedPath = resolvedPath.split('/');
        resolvedPath.pop();
        resolvedPath = resolvedPath.join('/');

        resolvedPath += `/public${
            flat.layoutPhoto[0].formats.medium
                ? flat.layoutPhoto[0].formats.medium.url
                : flat.layoutPhoto[0].formats.thumbnail.url
        }`;

        await strapi.bots.alanyaBot
            .sendPhoto(chatId, fs.createReadStream(resolvedPath), {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                ...localisation?.WRITE_AGENT_INLINE,
                                callback_data: JSON.stringify({
                                    action: 'WRITE_AGENT',
                                    recommendationKey: `api::flat.flat/${flat.id}`,
                                }),
                            },
                        ],
                        [
                            {
                                ...localisation?.FULL_DESCRIPTION,
                                callback_data: JSON.stringify({
                                    action: 'FULL_DESCRIPTION',
                                    flat: `api::flat.flat/${flat.id}`,
                                }),
                            },
                            {
                                ...localisation?.DELETE_ACTION,
                                callback_data: JSON.stringify({
                                    action: 'DELETE_ACTION',
                                    type: 'FLATS',
                                    flatId: flat.id,
                                }),
                            },
                        ],
                    ],
                },
            })
            .catch((e) => {
                console.error(e);
            });
    }

    await strapi.bots.alanyaBot
        .sendMessage(chatId, 'Выберите действие', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.SEARCH_FLATS,
                            callback_data: JSON.stringify({
                                action: 'SEARCH_FLATS',
                            }),
                        },
                        {
                            ...localisation?.GO_BACK_ACTION,
                            callback_data: JSON.stringify({
                                action: 'FAVORITE',
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
