const { lang, userLang } = require('../../../../../../botUtils/botsLanguages');
const path = require('path');
const fs = require('fs');

module.exports = async (msg) => {
    lang.currentLang = msg.from.language_code;
    const chatId = msg.chat.id;

    if (!msg.user) return;

    if (msg.user.favorite_cars.length === 0) {
        return await strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_FAVORITE_NOW.car, {
            reply_markup: {
                keyboard: [[userLang().FAVORITE_FLATS, userLang().SEARCH_CARS]],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        });
    }

    const cars = await strapi.db.query('api::car.car').findMany({
        where: {
            id: {
                $in: msg.user.favorite_cars.map((el) => el.id),
            },
        },
        populate: true,
    });

    for (const car of cars) {
        let resolvedPath = path.resolve('./index');
        resolvedPath = resolvedPath.split('/');
        resolvedPath.pop();
        resolvedPath = resolvedPath.join('/');
        resolvedPath += `/public${
            car.layoutPhoto[0].formats.medium
                ? car.layoutPhoto[0].formats.medium.url
                : car.layoutPhoto[0].formats.thumbnail.url
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
                                agentUsername: car.agent.agentUsername,
                            }),
                        },
                    ],
                ],
            },
        });
    }

    await strapi.bots.alanyaBot.sendMessage(chatId, 'Ищем дальше?', {
        reply_markup: {
            keyboard: [[userLang().FAVORITE_CARS]],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
};
