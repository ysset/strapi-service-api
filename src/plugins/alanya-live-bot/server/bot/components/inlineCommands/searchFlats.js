const { alanyaBot } = require('../../../../botUtils/errorHandlers');
const path = require('path');
const recommendations = require('../../../../botUtils/botManager/recomendationManager');
const fs = require('fs');

module.exports = async (query) => {
    const chatId = query.message?.chat.id || query.chat.id;
    const messageId = query.message?.message_id || query.message_id;
    const localisation = query.localisation;

    if (!query.user) return;

    const flat = await recommendations.get({
        user: query.user,
        filter: {
            type: 'FLATS',
            api: 'api::flat.flat',
        },
    });
    if (!flat) {
        return await alanyaBot.NO_FLATS({ chatId, messageId, localisation });
    }
    if (!flat.agent.username) {
        return await alanyaBot.SERVER_ERROR({ chatId, localisation });
    }

    let resolvedPath = path.resolve('./index');

    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');

    resolvedPath += `/public${
        flat.layoutPhoto[0].formats.medium
            ? flat.layoutPhoto[0].formats.medium.url
            : flat.layoutPhoto[0].formats.thumbnail.url
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
    });
    const params = {
        data: {
            checked_flats: [...query.user.checked_flats, flat.id],
        },
    };
    await strapi.entityService.update('api::telegram-user.telegram-user', 1, params).catch((e) => {
        console.log(e);
    });
};
