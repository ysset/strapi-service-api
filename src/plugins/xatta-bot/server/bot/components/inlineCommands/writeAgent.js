const recommendations = require('../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    const {
        user: { telegramID: userTelegramId, username },
        localisation,
        data,
        user,
    } = query;

    const [api, recommendationId] = query.data.rec.split('/');
    const recommendation = await strapi.entityService.findOne(api, recommendationId, {
        populate: '*',
    });

    const agentUsername = recommendation.agent.username;
    const agentTelegramId = recommendation.agent.telegramID;

    //get localisation
    const userMessage = localisation.WRITE_AGENT.userText(username, agentUsername);
    const realtorMessage = localisation.WRITE_AGENT.realtorText(username, agentUsername);
    const orderInfo = localisation.WRITE_AGENT.orderInfo(recommendation);

    //save current housing
    await recommendations
        .save({
            filter: {
                where: {
                    telegramID: query.from.id,
                },
                apiKey: 'api::telegram-user.telegram-user',
            },
            data,
            user,
        })
        .catch((e) => {
            console.error(e);
        });

    await strapi.bots.alanyaBot
        .sendMessage(userTelegramId, `${userMessage}\n\n${orderInfo}`)
        .catch((e) => console.error(e));

    await strapi.bots.admin
        .sendMessage(agentTelegramId, `${realtorMessage}\n\n${orderInfo}`)
        .catch((e) => console.error(e));

    await strapi.bots.alanyaBot
        .sendMessage(userTelegramId, 'Choose the action', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation.GO_BACK_ACTION,
                            callback_data: JSON.stringify({
                                action: 'SEARCH',
                            }),
                        },
                        {
                            text: 'Continue searching?',
                            callback_data: JSON.stringify({
                                action: 'SEARCH_FLATS',
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => console.log(e));
};
