const path = require('path');
const fs = require('fs');

const { getUser } = require('../../../../botUtils/userController');
const { alanyaBot } = require('../../../../botUtils/errorHandlers');
const recommendations = require('../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    const { localisation, chatId, messageId, data } = query;
    const { user } = await getUser(query);
    const api = data.api.toLowerCase();

    if (!user) return;

    const recommendation = await recommendations.get({
        user,
        filter: {
            type: 'FLATS',
            api: `api::${api}.${api}`,
        },
    });

    if (!recommendation) return await alanyaBot.NO_FLATS({ chatId, messageId, localisation });

    let recLocalisation = {
        ...recommendation,
        localisation: recommendation.localisation.find((rec) => rec.language === localisation.lang),
    };

    if (!recLocalisation.localisation)
        recLocalisation.localisation = recommendation.localisation.find((rec) => rec.language === 'en');

    if (!recLocalisation.agent?.username) return await alanyaBot.SERVER_ERROR({ chatId, localisation });
    const watchedObjects = user[`watched${data.api}`];

    const params = {
        data: {
            [`watched${data.api}`]: [...watchedObjects, recLocalisation.id],
        },
    };

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        recLocalisation.layoutPhoto[0].formats.medium
            ? recLocalisation.layoutPhoto[0].formats.medium.url
            : recLocalisation.layoutPhoto[0].formats.thumbnail.url
    }`;

    await strapi.bots.alanyaBot
        .sendPhoto(chatId, fs.createReadStream(resolvedPath), {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.SAVE_INLINE,
                            callback_data: JSON.stringify({
                                action: 'SAVE',
                                api: data.api,
                                flatId: recLocalisation.id,
                            }),
                        },
                        {
                            ...localisation?.NEXT_INLINE,
                            callback_data: JSON.stringify({
                                action: 'NEXT',
                                api: data.api,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.FULL_DESCRIPTION,
                            callback_data: JSON.stringify({
                                action: 'FULL_DESCRIPTION',
                                flat: `api::${api}.${api}/${recLocalisation.id}`,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.WRITE_AGENT_INLINE,
                            callback_data: JSON.stringify({
                                action: 'WRITE_AGENT',
                                api: data.api,
                                flatId: recLocalisation.id,
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
        })
        .catch((e) => {
            console.error(e);
        });

    await strapi.entityService.update('api::telegram-user.telegram-user', user.id, params).catch((e) => {
        console.error(e);
    });
};
