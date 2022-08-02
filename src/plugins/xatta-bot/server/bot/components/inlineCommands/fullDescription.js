const fs = require('fs');
const path = require('path');

module.exports = async (query) => {
    if (!query.user) return;

    const { localisation, chatId } = query;
    const [UId, entityId] = query.data.flat.split('/');
    const arrayOfPhotos = [];
    const flat = await strapi.entityService
        .findOne(UId, entityId, {
            populate: '*',
        })
        .catch((e) => {
            console.error(e);
        });

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');

    flat.layoutPhoto.forEach((photo) => {
        const path =
            resolvedPath +
            `/public${photo.formats.medium ? photo.formats.medium.url : photo.formats.thumbnail.url}`;

        arrayOfPhotos.push({
            type: 'photo',
            media: fs.createReadStream(path),
        });
    });

    arrayOfPhotos[0].caption = localisation.HOUSING_FULL_DESCRIPTION(flat);

    await strapi.bots.alanyaBot.sendMediaGroup(chatId, arrayOfPhotos).catch((e) => {
        console.error(e);
    });
    await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation?.CHOOSE_THE_ACTION.text(flat.id), {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.WRITE_AGENT_INLINE,
                            callback_data: JSON.stringify({
                                action: 'WRITE_AGENT',
                                rec: `api::housing.housing/${flat.id}`,
                            }),
                        },
                    ],
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
};
