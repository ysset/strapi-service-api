const path = require('path');
const fs = require('fs');
const actions = require('../actions');

const getKeyboard = ({ favorite, localisation, table, flatId, writeAgent }) => {
    if (favorite && writeAgent)
        return [
            [
                {
                    ...localisation?.NEXT_INLINE,
                    callback_data: JSON.stringify({
                        action: actions.NEXT_FLAT,
                        table,
                        flatId,
                    }),
                },
            ],
            [
                {
                    ...localisation?.FULL_DESCRIPTION,
                    callback_data: JSON.stringify({
                        action: actions.SEARCH_FULL_DESCRIPTION,
                        table,
                        flatId,
                    }),
                },
            ],
        ];
    if (writeAgent)
        return [
            [
                {
                    ...localisation?.SAVE_INLINE,
                    callback_data: JSON.stringify({
                        action: actions.SAVE,
                        table,
                        flatId,
                    }),
                },
                {
                    ...localisation?.NEXT_INLINE,
                    callback_data: JSON.stringify({
                        action: actions.NEXT_FLAT,
                        table,
                        flatId,
                    }),
                },
            ],
            [
                {
                    ...localisation?.FULL_DESCRIPTION,
                    callback_data: JSON.stringify({
                        action: actions.SEARCH_FULL_DESCRIPTION,
                        table,
                        flatId,
                    }),
                },
            ],
        ];
    if (favorite)
        return [
            [
                {
                    ...localisation?.NEXT_INLINE,
                    callback_data: JSON.stringify({
                        action: actions.NEXT_FLAT,
                        table,
                        flatId,
                    }),
                },
            ],
            [
                {
                    ...localisation?.FULL_DESCRIPTION,
                    callback_data: JSON.stringify({
                        action: actions.SEARCH_FULL_DESCRIPTION,
                        table,
                        flatId,
                    }),
                },
            ],
            [
                {
                    ...localisation?.WRITE_INLINE[table.toLowerCase()],
                    callback_data: JSON.stringify({
                        action: actions.SEARCH_WRITE_AGENT,
                        table,
                        flatId,
                    }),
                },
            ],
        ];
    return [
        [
            {
                ...localisation?.SAVE_INLINE,
                callback_data: JSON.stringify({
                    action: actions.SAVE,
                    table,
                    flatId,
                }),
            },
            {
                ...localisation?.NEXT_INLINE,
                callback_data: JSON.stringify({
                    action: actions.NEXT_FLAT,
                    table,
                    flatId,
                }),
            },
        ],
        [
            {
                ...localisation?.FULL_DESCRIPTION,
                callback_data: JSON.stringify({
                    action: actions.SEARCH_FULL_DESCRIPTION,
                    table,
                    flatId,
                }),
            },
        ],
        [
            {
                ...localisation?.WRITE_INLINE[table.toLowerCase()],
                callback_data: JSON.stringify({
                    action: actions.SEARCH_WRITE_AGENT,
                    table,
                    flatId,
                }),
            },
        ],
    ];
};

module.exports = async (bot, writeAgent) => {
    const {
        localisation,
        user,
        chatId,
        data: { table, flatId },
    } = bot;
    const api = `api::${table.toLowerCase()}.${table.toLowerCase()}`;
    const favorites = {
        Complex: user.favoriteComplex,
        Villa: user.favoriteVilla,
        Owner: user.favoriteOwner,
    };

    let [object] = await strapi.entityService
        .findMany(api, {
            filters: { id: flatId },
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
        .then((r) =>
            r.map((el) => {
                el.table = table;
                el.api = api;
                if (favorites[table].some((favorite) => favorite.id === el.id)) el.favorite = true;
                return el;
            })
        )
        .catch(console.error);

    object.localisation = object.localisation.find((rec) => rec.language === 'ru' || rec.language === 'en');
    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        object.layoutPhoto[0].url ? object.layoutPhoto[0].url : object.layoutPhoto[0].formats.large.url
    }`;

    const caption = localisation.SHORT_DESCRIPTION[table.toLowerCase()](object.localisation, object.favorite);

    await bot
        .sendPhoto(chatId, fs.createReadStream(resolvedPath), {
            caption,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: getKeyboard({
                    favorite: object.favorite,
                    flatId,
                    localisation,
                    table,
                    writeAgent,
                }),
            },
        })
        .catch((e) => {
            console.error(e);
        });

    return { ok: true };
};
