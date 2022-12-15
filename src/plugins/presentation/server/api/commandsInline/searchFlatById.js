const path = require('path');
const fs = require('fs');
const actions = require('../../../../utils/actions');

module.exports = async (bot) => {
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

    const caption = localisation.shortDescription[table.toLowerCase()](object.localisation, object.favorite);

    await bot
        .sendPhoto(chatId, fs.createReadStream(resolvedPath), {
            caption,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.SAVE_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SAVE,
                                table: object.table,
                                flatId: object.id,
                            }),
                        },
                        {
                            ...localisation?.NEXT_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FLATS,
                                table: object.table,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.FULL_DESCRIPTION,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FULL_DESCRIPTION,
                                table: object.table,
                                flatId: object.id,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.WRITE_INLINE[table.toLowerCase()],
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_WRITE_AGENT,
                                table: object.table,
                                flatId: object.id,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });

    return { ok: true };
};
