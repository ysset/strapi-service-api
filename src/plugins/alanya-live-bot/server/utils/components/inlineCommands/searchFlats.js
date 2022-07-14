const { alanyaBot } = require('../../../../../botUtils/errorHandlers');
const path = require('path');
const { userLang } = require('../../../../../botUtils/botsLanguages');
const recommendations = require('../../../../../botUtils/botManager/recomendationManager');
const fs = require('fs');

module.exports = async (query) => {
    const chatId = query.message?.chat.id || query.chat.id;
    const localisation = userLang(query.user.language);

    if (!query.user) return;

    const recommendationFlat = await recommendations.get({
        user: query.user,
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

    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');

    resolvedPath += `/public${
        recommendationFlat.layoutPhoto[0].formats.medium
            ? recommendationFlat.layoutPhoto[0].formats.medium.url
            : recommendationFlat.layoutPhoto[0].formats.thumbnail.url
    }`;

    await strapi.bots.alanyaBot.sendPhoto(chatId, fs.createReadStream(resolvedPath), {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...localisation?.SAVE_INLINE,
                        callback_data: JSON.stringify({
                            action: 'SAVE',
                            type: 'FLATS',
                            recId: recommendationFlat.id,
                        }),
                    },
                    {
                        ...localisation?.NEXT_INLINE,
                        callback_data: JSON.stringify({
                            action: 'NEXT',
                            type: 'FLATS',
                        }),
                    },
                ],
                [
                    {
                        ...localisation?.WRITE_AGENT_INLINE,
                        callback_data: JSON.stringify({
                            action: 'WRITE_AGENT',
                            recommendationKey: `api::flat.flat/${recommendationFlat.id}`,
                        }),
                    },
                ],
                [
                    {
                        ...localisation?.GO_BACK_ACTION,
                        callback_data: JSON.stringify({
                            action: 'SEARCH',
                        }),
                    },
                ],
            ],
        },
    });
    const params = {
        data: {
            checked_flats: [...query.user.checked_flats, recommendationFlat.id],
        },
    };
    await strapi.entityService.update('api::telegram-user.telegram-user', 1, params).catch((e) => {
        console.log(e);
    });
};
