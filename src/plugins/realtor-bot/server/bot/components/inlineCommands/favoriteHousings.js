const path = require('path');
const fs = require('fs');
const actions = require('../actions');

module.exports = async (bot) => {
    const { localisation, messageId, chatId, user } = bot;

    if (!user) return;
    if (messageId) bot.deleteMessage(chatId, messageId).catch(console.error);

    const flats = [
        await strapi.db
            .query('api::complex.complex')
            .findMany({
                where: {
                    id: {
                        $in: user.favoriteComplex.map((el) => el.id),
                    },
                },
                populate: {
                    localisation: {
                        populate: {
                            apartments: true,
                            infrastructure: true,
                            apartmentEquipment: true,
                            floors: true,
                        },
                    },
                    layoutPhoto: true,
                    agent: true,
                },
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
                populate: {
                    localisation: {
                        populate: {
                            apartments: true,
                            infrastructure: true,
                            apartmentEquipment: true,
                            floors: true,
                        },
                    },
                    layoutPhoto: true,
                    agent: true,
                },
            })
            .then((res) => {
                res.forEach((el) => {
                    el.api = 'api::villa.villa';
                    el.table = 'villa';
                });
                return res;
            })
            .catch(console.error),
        await strapi.db
            .query('api::owner.owner')
            .findMany({
                where: {
                    id: {
                        $in: user.favoriteOwner.map((el) => el.id),
                    },
                },
                populate: {
                    localisation: {
                        populate: {
                            apartments: true,
                            infrastructure: true,
                            apartmentEquipment: true,
                            floors: true,
                        },
                    },
                    layoutPhoto: true,
                    agent: true,
                },
            })
            .then((res) => {
                res.forEach((el) => {
                    el.api = 'api::owner.owner';
                    el.table = 'owner';
                });
                return res;
            })
            .catch(console.error),
    ];
    const favoriteHousings = flats.flat(1);

    if (favoriteHousings.length === 0) {
        return await bot.sendMessage(chatId, localisation?.NO_FAVORITE_NOW).catch(console.error);
    }

    for (const flat of favoriteHousings) {
        let resolvedPath = path.resolve('./index');
        flat.localisation = flat.localisation.find(
            (rec) => rec.language === bot.language || rec.localisation === 'en'
        );
        if (!localisation) continue;
        resolvedPath = resolvedPath.split('/');
        resolvedPath.pop();
        resolvedPath = resolvedPath.join('/');

        resolvedPath += `/public${
            flat.layoutPhoto[0].formats.medium
                ? flat.layoutPhoto[0].formats.medium.url
                : flat.layoutPhoto[0].formats.thumbnail.url
        }`;

        const table = flat.table;
        const flatId = flat.id;
        const caption = localisation.SHORT_DESCRIPTION[table](flat.localisation);

        await bot
            .sendPhoto(chatId, fs.createReadStream(resolvedPath), {
                caption,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                ...localisation?.WRITE_INLINE[table.toLowerCase()],
                                callback_data: JSON.stringify({
                                    action: actions.FAVORITE_WRITE_AGENT,
                                    table,
                                    flatId,
                                }),
                            },
                        ],
                        [
                            {
                                ...localisation?.DELETE_ACTION,
                                callback_data: JSON.stringify({
                                    action: actions.DELETE_ACTION,
                                    table,
                                    flatId,
                                }),
                            },
                        ],
                        [
                            {
                                ...localisation?.FULL_DESCRIPTION,
                                callback_data: JSON.stringify({
                                    action: actions.FAVORITE_FULL_DESCRIPTION,
                                    table,
                                    flatId,
                                }),
                            },
                        ],
                    ],
                },
            })
            .catch(console.error);
    }
};
