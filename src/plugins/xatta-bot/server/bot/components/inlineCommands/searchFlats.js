const { alanyaBot } = require('../../../../botUtils/errorHandlers');
const path = require('path');
const recommendations = require('../../../../botUtils/botManager/recomendationManager');
const fs = require('fs');
const { getUser } = require('../../../../botUtils/userController');

module.exports = async (query) => {
    const { localisation, chatId, messageId } = query;
    const { user } = await getUser(query);

    if (!user) return;

    const flat = await recommendations.get({
        user,
        filter: {
            type: 'FLATS',
            api: 'api::flat.flat',
        },
    });

    if (!flat) return await alanyaBot.NO_FLATS({ chatId, messageId, localisation });
    if (!flat.agent?.username) return await alanyaBot.SERVER_ERROR({ chatId, localisation });

    const params = {
        data: {
            checked_flats: [...user.checked_flats, flat.id],
        },
    };

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        flat.layoutPhoto[0].formats.medium
            ? flat.layoutPhoto[0].formats.medium.url
            : flat.layoutPhoto[0].formats.thumbnail.url
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
                                type: 'FLATS',
                                flatId: flat.id,
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
                                recommendationKey: `api::flat.flat/${flat.id}`,
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