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

    const photo = recommendationFlat.layoutPhoto;
    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        photo[0].formats.medium ? photo[0].formats.medium.url : photo[0].formats.thumbnail.url
    }`;
    console.log(resolvedPath);
    const stream = fs.createReadStream(resolvedPath);

    await strapi.bots.alanyaBot.sendPhoto(chatId, stream, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...userLang().SAVE_INLINE,
                        callback_data: JSON.stringify({
                            action: 'SAVE',
                            type: 'FLATS',
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
