const fs = require('fs');
const path = require('path');

module.exports = async (query) => {
    const {
        localisation,
        chatId,
        data: { table, flatId },
    } = query;

    const api = `api::${table.toLowerCase()}.${table.toLowerCase()}`;
    const arrayOfPhotos = [];

    const flat = await strapi.entityService.findOne(api, flatId, { populate: '*' }).catch(console.error);

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

    let recLocalisation = flat.localisation.find((rec) => rec.language === localisation.lang);

    if (!recLocalisation) recLocalisation = flat.localisation.find((rec) => rec.language === 'en');

    arrayOfPhotos[0].caption = localisation.HOUSING_FULL_DESCRIPTION(recLocalisation);

    await strapi.bots.alanyaBot.sendMediaGroup(chatId, arrayOfPhotos).catch(console.error);

    await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation?.CHOOSE_THE_ACTION.text(flat.id), {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.WRITE_AGENT_INLINE,
                            callback_data: JSON.stringify({
                                action: 'WRITE_AGENT',
                                table,
                                flatId,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch(console.error);
};
