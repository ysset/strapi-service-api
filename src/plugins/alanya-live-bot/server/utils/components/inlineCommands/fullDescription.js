const { localisation, userLang } = require('../../../../../botUtils/botsLanguages');
const fs = require('fs');

const path = require('path');

module.exports = async (query) => {
    if (!query.user) return;

    localisation.current = query.from.language_code;
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
    const message = await strapi.bots.alanyaBot.sendMessage(
        chatId,
        userLang().CHOOSE_THE_ACTION.text(flat.id),
        {
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
                    [
                        {
                            ...userLang().GO_BACK_ACTION,
                            callback_data: JSON.stringify({
                                action: 'FAVORITE',
                            }),
                        },
                        {
                            ...userLang().DELETE_ACTION,
                            callback_data: JSON.stringify({
                                action: 'DELETE_ACTION',
                                agentUsername: flat.agent.agentUsername,
                            }),
                        },
                    ],
                ],
            },
        }
    );
    console.log(message);
};
