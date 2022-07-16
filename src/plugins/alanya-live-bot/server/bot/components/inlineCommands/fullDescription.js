const fs = require('fs');

const path = require('path');

module.exports = async (query) => {
    if (!query.user) return;

    const localisation = query.localisation;
    const chatId = query.message?.chat.id || query.chat.id;
    const [UId, entityId] = query.data.flat.split('/');
    const arrayOfPhotos = [];
    const flat = await strapi.entityService.findOne(UId, entityId, {
        populate: '*',
    });

    let resolvedPath = path.resolve('./index');

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

    arrayOfPhotos[0].caption = flat.caption;

    await strapi.bots.alanyaBot.sendMediaGroup(chatId, arrayOfPhotos);
    await strapi.bots.alanyaBot.sendMessage(chatId, localisation?.CHOOSE_THE_ACTION.text(flat.id), {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...localisation?.WRITE_AGENT_INLINE,
                        callback_data: JSON.stringify({
                            action: 'WRITE_AGENT',
                            agentUsername: flat.agent.agentUsername,
                        }),
                    },
                ],
                [
                    {
                        ...localisation?.SEARCH_FLATS,
                        callback_data: JSON.stringify({
                            action: 'SEARCH_FLATS',
                        }),
                    },
                ],
                [
                    {
                        ...localisation?.GO_BACK_ACTION,
                        callback_data: JSON.stringify({
                            action: 'FAVORITE',
                        }),
                    },
                    {
                        ...localisation?.DELETE_ACTION,
                        callback_data: JSON.stringify({
                            action: 'DELETE_ACTION',
                            agentUsername: flat.agent.agentUsername,
                        }),
                    },
                ],
            ],
        },
    });
};
