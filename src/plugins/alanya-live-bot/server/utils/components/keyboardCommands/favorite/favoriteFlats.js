const { localisation, userLang } = require('../../../../../../botUtils/botsLanguages');
const path = require('path');
const fs = require('fs');

module.exports = async (msg) => {
    localisation.current = msg.from.language_code;
    const chatId = msg.chat.id;

    if (!msg.user) return;

    if (msg.user.favorite_flats.length === 0) {
        return await strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_FAVORITE_NOW.flat, {
            reply_markup: {
                keyboard: [
                    [
                        // userLang().FAVORITE_CARS,
                        userLang().SEARCH_FLATS,
                    ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        });
    }

    const flats = await strapi.db.query('api::flat.flat').findMany({
        where: {
            id: {
                $in: msg.user.favorite_flats.map((el) => el.id),
            },
        },
        populate: true,
    });

    for (const flat of flats) {
        let resolvedPath = path.resolve('./index');
        let arrayOfPhotos = [];

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

        await strapi.bots.alanyaBot.sendMediaGroup(chatId, arrayOfPhotos, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...userLang().WRITE_AGENT_INLINE,
                            callback_data: JSON.stringify({
                                action: 'WRITE_AGENT',
                                agentUsername: flat.agent.agentUsername,
                            }),
                        },
                    ],
                ],
            },
        });
    }

    await strapi.bots.alanyaBot.sendMessage(chatId, 'Ищем дальше?', {
        reply_markup: {
            keyboard: [[userLang().SEARCH_FLATS]],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
};
