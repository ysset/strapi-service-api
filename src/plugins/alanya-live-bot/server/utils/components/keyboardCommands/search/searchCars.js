const { alanyaBot } = require('../../../../../../botUtils/errorHandlers');
const path = require('path');
const fs = require('fs');
const { userLang } = require('../../../../../../botUtils/botsLanguages');
const recommendations = require('../../../../../../botUtils/botManager/recomendationManager');

module.exports = async (msg) => {
    const chatId = msg.chat.id;

    if (!msg.user) return;

    const recommendationCar = await recommendations.get({
        user: msg.user,
        filter: {
            type: 'CARS',
            api: 'api::car.car',
        },
    });

    if (!recommendationCar) {
        return await alanyaBot.NO_CARS(chatId);
    }
    if (!recommendationCar.agent.agentUsername) {
        return await alanyaBot.SERVER_ERROR(chatId);
    }

    const photo = recommendationCar.carPhoto;
    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        photo[0].formats.medium ? photo[0].formats.medium.url : photo[0].formats.thumbnail.url
    }`;
    console.log(resolvedPath);
    const stream = fs.createReadStream(resolvedPath);

    await strapi.bots.alanyaBot.sendPhoto(chatId, stream, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...userLang().SAVE_INLINE,
                        callback_data: JSON.stringify({
                            action: 'SAVE',
                            type: 'CARS',
                        }),
                    },
                    {
                        ...userLang().NEXT_INLINE,
                        callback_data: JSON.stringify({
                            action: 'NEXT',
                            type: 'CARS',
                        }),
                    },
                ],
                [
                    {
                        ...userLang().WRITE_AGENT_INLINE,
                        callback_data: JSON.stringify({
                            action: 'WRITE_AGENT',
                            recommendationKey: `api::car.car/${recommendationCar.id}`,
                        }),
                    },
                ],
            ],
        },
    });
    await strapi.entityService.update('api::telegram-user.telegram-user', msg.user.id, {
        checked_cars: [...msg.user.checked_cars, recommendationCar.id],
    });
};
