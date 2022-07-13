const { localisation, userLang } = require('../../../../../botUtils/botsLanguages');
const path = require('path');

module.exports = async (query) => {
    localisation.current = query.from.language_code;
    const chatId = query.message?.chat.id || query.chat.id;
    const messageId = query.message_id;

    if (!query.user) return;

    if (query.user.favorite_flats.length === 0) {
        return await strapi.bots.alanyaBot.editMessageText(userLang().NO_FAVORITE_NOW.flat, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: [
                    [
                        // userLang().FAVORITE_CARS,
                        userLang().SEARCH_FLATS,
                    ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        });
    }

    const flats = await strapi.db.query('api::flat.flat').findMany({
        where: {
            id: {
                $in: query.user.favorite_flats.map((el) => el.id),
            },
        },
        populate: true,
    });

    for (const flat of flats) {
        let resolvedPath = path.resolve('./index');

        resolvedPath = resolvedPath.split('/');
        resolvedPath.pop();
        resolvedPath = resolvedPath.join('/');

        resolvedPath += `/public${
            flat.layoutPhoto[0].formats.medium
                ? flat.layoutPhoto[0].formats.medium.url
                : flat.layoutPhoto[0].formats.thumbnail.url
        }`;

        await strapi.bots.alanyaBot.sendPhoto(chatId, resolvedPath, {
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
                ],
            },
        });
    }

    await strapi.bots.alanyaBot.sendMessage(chatId, 'Ищем дальше?', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...userLang().SEARCH_FLATS,
                        callback_data: JSON.stringify({
                            action: 'SEARCH_FLATS',
                        }),
                    },
                ],
            ],
        },
    });
};
