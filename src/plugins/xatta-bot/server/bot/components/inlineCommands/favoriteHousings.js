const path = require('path');
const fs = require('fs');
const actions = require('../actions');

module.exports = async (query) => {
    const { localisation, messageId, chatId, user } = query;

    if (!user) return;
    if (messageId) strapi.bots.alanyaBot.deleteMessage(chatId, messageId).catch(console.error);

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
            .catch(console.error),
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
            .catch(console.error),
    ];
    const favoriteHousings = flats.flat(1);

    if (favoriteHousings.length === 0) {
        return await strapi.bots.alanyaBot
            .sendMessage(chatId, localisation?.NO_FAVORITE_NOW)
            .catch(console.error);
    }

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
                                    action: actions.FAVORITE_WRITE_AGENT,
                                    table: flat.table,
                                    flatId: flat.id,
                                }),
                            },
                        ],
                        [
                            {
                                ...localisation?.DELETE_ACTION,
                                callback_data: JSON.stringify({
                                    action: actions.DELETE_ACTION,
                                    table: flat.table,
                                    flatId: flat.id,
                                }),
                            },
                        ],
                        [
                            {
                                ...localisation?.FULL_DESCRIPTION,
                                callback_data: JSON.stringify({
                                    action: actions.FAVORITE_FULL_DESCRIPTION,
                                    table: flat.table,
                                    flatId: flat.id,
                                }),
                            },
                        ],
                    ],
                },
            })
            .catch(console.error);
    }
};
