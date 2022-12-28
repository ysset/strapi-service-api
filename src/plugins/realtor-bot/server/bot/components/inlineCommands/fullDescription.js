const fs = require('fs');
const path = require('path');

module.exports = async (bot) => {
    let {
        localisation,
        chatId,
        data: { table, flatId, flat },
    } = bot;
    if (table) table = table.toLowerCase();
    if (!table) table = flat?.split('.')[1].split('/')[0];
    const api = `api::${table}.${table}`;
    const arrayOfArrayOfPhotos = [];
    let messages = [];

    const object = await strapi.entityService
        .findOne(api, flatId, {
            populate: {
                localisation: {
                    populate: {
                        apartments: true,
                        infrastructure: true,
                        apartmentEquipment: true,
                        floors: true,
                    },
                },
                agent: true,
                layoutPhoto: true,
            },
        })
        .catch(console.error);

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    object.layoutPhoto.shift();
    object.layoutPhoto.forEach((photo, i) => {
        if (!photo || !photo.formats) return;
        const index = parseInt(i / 10);
        const path =
            resolvedPath +
            `/public${
                photo.size < 250
                    ? photo.url
                    : photo.formats?.large
                    ? photo.formats?.large.url
                    : photo.formats?.medium
                    ? photo.formats?.medium.url
                    : photo.formats?.small.url
            }`;
        if (!arrayOfArrayOfPhotos[index]) arrayOfArrayOfPhotos[index] = [];

        // we can send 10 photo in one time
        arrayOfArrayOfPhotos[index].push({
            type: 'photo',
            media: fs.createReadStream(path),
        });
    });

    let recLocalisation = object.localisation.find((rec) => rec.language === localisation.lang);

    if (!recLocalisation) recLocalisation = object.localisation.find((rec) => rec.language === 'en');

    const caption = localisation.HOUSING_FULL_DESCRIPTION[table]({
        ...recLocalisation,
        locationUrl: object.locationUrl,
        agent: object.agent,
        table,
    });

    for (let arrayOfPhotos of arrayOfArrayOfPhotos) {
        messages.push(await bot.sendMediaGroup(chatId, arrayOfPhotos).catch(console.error));
    }

    //ожидаем пока отправятся все фото чтоб описание не прилетело раньше фото
    await new Promise((resolve) => {
        setTimeout(() => resolve(), 1500);
    });

    messages = messages.flat(1);
    messages = messages.map((el) => ({ messageId: el.message_id }));
    return { caption, table, messages };
};
