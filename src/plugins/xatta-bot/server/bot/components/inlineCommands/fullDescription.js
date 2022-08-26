const fs = require('fs');
const path = require('path');

module.exports = async (query) => {
    const {
        localisation,
        chatId,
        data: { table, flatId },
    } = query;

    const api = `api::${table.toLowerCase()}.${table.toLowerCase()}`;
    const arrayOfArrayOfPhotos = [];

    const flat = await strapi.entityService
        .findOne(api, flatId, {
            populate: {
                localisation: {
                    populate: {
                        apartments: true,
                        infrastructure: true,
                        apartmentEquipment: true,
                    },
                },
                layoutPhoto: true,
            },
        })
        .catch(console.error);

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');

    flat.layoutPhoto.forEach((photo, i) => {
        if (!photo.formats) return;
        const index = parseInt(i / 10);
        const path =
            resolvedPath +
            `/public${photo.formats?.medium ? photo.formats.medium.url : photo.formats?.thumbnail.url}`;
        if (!arrayOfArrayOfPhotos[index]) arrayOfArrayOfPhotos[index] = [];

        // we can send 10 photo in one time
        arrayOfArrayOfPhotos[index].push({
            type: 'photo',
            media: fs.createReadStream(path),
        });
    });

    let recLocalisation = flat.localisation.find((rec) => rec.language === localisation.lang);

    if (!recLocalisation) recLocalisation = flat.localisation.find((rec) => rec.language === 'en');

    arrayOfArrayOfPhotos[arrayOfArrayOfPhotos.length - 1][0].caption = localisation.HOUSING_FULL_DESCRIPTION({
        ...recLocalisation,
        locationUrl: flat.locationUrl,
    });

    for (let arrayOfPhotos of arrayOfArrayOfPhotos) {
        await strapi.bots.alanyaBot.sendMediaGroup(chatId, arrayOfPhotos).catch(console.error);
    }
};
