const path = require('path');
const fs = require('fs');

const { getUser } = require('../../../../botUtils/userController');
const { alanyaBot } = require('../../../../botUtils/errorHandlers');
const recommendations = require('../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    const {
        localisation,
        chatId,
        data: { table },
    } = query;
    const { user } = await getUser(query);
    const api = `api::${table.toLowerCase()}.${table.toLowerCase()}`;

    const recommendation = await recommendations.get({
        user,
        api,
    });

    if (!recommendation) return await alanyaBot.NO_FLATS({ chatId, localisation, table });

    let recLocalisation = {
        ...recommendation,
        localisation: recommendation.localisation.find((rec) => rec.language === localisation.lang),
    };

    if (!recLocalisation.localisation)
        recLocalisation.localisation = recommendation.localisation.find((rec) => rec.language === 'en');

    if (!recLocalisation.agent?.username) return await alanyaBot.SERVER_ERROR({ chatId, localisation });

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
                                table,
                                flatId: recLocalisation.id,
                            }),
                        },
                        {
                            ...localisation?.NEXT_INLINE,
                            callback_data: JSON.stringify({
                                action: 'NEXT',
                                table,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.FULL_DESCRIPTION,
                            callback_data: JSON.stringify({
                                action: 'FULL_DESCRIPTION',
                                flat: `${api}/${recLocalisation.id}`,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.WRITE_AGENT_INLINE,
                            callback_data: JSON.stringify({
                                action: 'WRITE_AGENT',
                                table,
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

    const watchedObjects = user[`watched${table}`];
    const params = {
        data: {
            [`watched${table}`]: [...watchedObjects, recLocalisation.id],
        },
    };

    await strapi.entityService.update('api::telegram-user.telegram-user', user.id, params).catch((e) => {
        console.error(e);
    });
};
