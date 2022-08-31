const path = require('path');
const fs = require('fs');

const { getUser } = require('../../../../botUtils/userController');
const { alanyaBot } = require('../../../../botUtils/errorHandlers');
const recommendations = require('../../../../botUtils/botManager/recomendationManager');
const actions = require('../actions');

module.exports = async (query) => {
    const { localisation, chatId, filters } = query;
    let { user } = await getUser(query);

    let recommendation = await recommendations.get({ user, filters });

    if (!recommendation) {
        user = await strapi.entityService
            .update('api::telegram-user.telegram-user', query.user.id, {
                data: {
                    watchedComplex: [],
                    watchedVilla: [],
                },
                populate: '*',
            })
            .catch(console.error);

        recommendation = await recommendations.get({ user, filters });
    }

    if (!recommendation) return await alanyaBot.NO_FLATS({ chatId, localisation });

    let recLocalisation = {
        ...recommendation,
        localisation: recommendation.localisation.find((rec) => rec.language === localisation.lang),
    };

    if (!recLocalisation.localisation)
        recLocalisation.localisation = recommendation.localisation.find((rec) => rec.language === 'en');

    if (!recLocalisation.agent?.username) return await alanyaBot.SERVER_ERROR({ chatId, localisation });

    if (!recLocalisation.layoutPhoto || recLocalisation.layoutPhoto.length === 0)
        return await alanyaBot.SERVER_ERROR({
            chatId,
            localisation,
        });

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
                                action: actions.SAVE,
                                table: recLocalisation.table,
                                flatId: recLocalisation.id,
                            }),
                        },
                        {
                            ...localisation?.NEXT_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FLATS,
                                table: recLocalisation.table,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.FULL_DESCRIPTION,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FULL_DESCRIPTION,
                                table: recLocalisation.table,
                                flatId: recLocalisation.id,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.WRITE_AGENT_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_WRITE_AGENT,
                                table: recLocalisation.table,
                                flatId: recLocalisation.id,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });

    const watchedObjects = user[`watched${recLocalisation.table}`];
    const params = {
        data: {
            [`watched${recLocalisation.table}`]: [...watchedObjects, recLocalisation.id],
        },
    };

    await strapi.entityService
        .update('api::telegram-user.telegram-user', user.id, params)
        .catch(console.error);

    return { ok: true };
};
