const { lang, userLang } = require('../../../../../../botUtils/botsLanguages');
const path = require('path');
const fs = require('fs');

module.exports = async (msg) => {
    lang.currentLang = msg.from.language_code;
    const chatId = msg.chat.id;

    if (!msg.user) return;

    if (msg.user.favorite_flats.length === 0) {
        return await strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_FAVORITE_NOW.flat, {
            reply_markup: {
                keyboard: [
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
                $in: msg.user.favorite_flats.map((el) => el.id),
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
        console.log(resolvedPath);
        const stream = fs.createReadStream(resolvedPath);
        await strapi.bots.alanyaBot.sendPhoto(chatId, stream, {
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
            keyboard: [[userLang().SEARCH_FLATS]],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
};
