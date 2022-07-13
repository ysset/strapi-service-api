const { alanyaBot } = require('../../../../../../botUtils/errorHandlers');
const path = require('path');
const fs = require('fs');
const { userLang } = require('../../../../../../botUtils/botsLanguages');
const infinityQueue = require('../../../../../../botUtils/botManager/recomendationManager');
const recommendations = new infinityQueue();

module.exports = async (msg) => {
    const chatId = msg.chat.id;

    if (!msg.user) return;

    const recommendationFlat = await recommendations.get({
        user: msg.user,
        filter: {
            type: 'FLATS',
            api: 'api::flat.flat',
        },
    });

    if (!recommendationFlat) {
        return await alanyaBot.NO_FLATS(chatId);
    }
    if (!recommendationFlat.agent.agentUsername) {
        return await alanyaBot.SERVER_ERROR(chatId);
    }

    let resolvedPath = path.resolve('./index');
    let arrayOfPhotos = [];

    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');

    recommendationFlat.layoutPhoto.forEach((photo) => {
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
                        ...userLang().SAVE_INLINE,
                        callback_data: JSON.stringify({
                            action: 'SAVE',
                            type: 'FLATS',
                            recId: recommendationFlat.id,
                        }),
                    },
                    {
                        ...userLang().NEXT_INLINE,
                        callback_data: JSON.stringify({
                            action: 'NEXT',
                            type: 'FLATS',
                        }),
                    },
                ],
                [
                    {
                        ...userLang().WRITE_AGENT_INLINE,
                        callback_data: JSON.stringify({
                            action: 'WRITE_AGENT',
                            recommendationKey: `api::flat.flat/${recommendationFlat.id}`,
                        }),
                    },
                ],
            ],
        },
    });
    const params = {
        data: {
            checked_flats: [...msg.user.checked_flats, recommendationFlat.id],
        },
    };
    await strapi.entityService.update('api::telegram-user.telegram-user', 1, params).catch((e) => {
        console.log(e);
    });
};
