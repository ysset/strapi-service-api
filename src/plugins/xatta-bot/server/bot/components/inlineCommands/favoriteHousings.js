const path = require('path');
const fs = require('fs');

module.exports = async (query) => {
    const { localisation, messageId, chatId, user } = query;

    if (!user) return;

    const flats = [
        await strapi.db
            .query('api::complex.complex')
            .findMany({
                where: {
                    id: {
                        $in: user.favoriteComplex.map((el) => el.id),
                    },
                },
                populate: true,
            })
            .then((res) => {
                res.forEach((el) => {
                    el.api = 'api::complex.complex';
                    el.table = 'complex';
                });
                return res;
            })
            .catch((e) => {
                console.error(e);
            }),
        await strapi.db
            .query('api::villa.villa')
            .findMany({
                where: {
                    id: {
                        $in: user.favoriteVilla.map((el) => el.id),
                    },
                },
                populate: true,
            })
            .then((res) => {
                res.forEach((el) => {
                    el.api = 'api::villa.villa';
                    el.table = 'villa';
                });
                return res;
            })
            .catch((e) => {
                console.error(e);
            }),
    ];

    const favoriteHousings = flats.flat(1);

    if (favoriteHousings.length === 0)
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
                                    action: 'SEARCH',
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

    for (const flat of favoriteHousings) {
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
                                    rec: `${flat.api}/${flat.id}`,
                                }),
                            },
                        ],
                        [
                            {
                                ...localisation?.FULL_DESCRIPTION,
                                callback_data: JSON.stringify({
                                    action: 'FULL_DESCRIPTION',
                                    flat: `${flat.api}/${flat.id}`,
                                }),
                            },
                            {
                                ...localisation?.DELETE_ACTION,
                                callback_data: JSON.stringify({
                                    action: 'DELETE_ACTION',
                                    flatInfo: `${flat.table}/${flat.id}`,
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
