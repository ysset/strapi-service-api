const axios = require('axios');

module.exports = async (query) => {
    const [api, recommendationId] = query.data.recommendationKey.split('/');

    const [recommendation] = await strapi.entityService.findMany(api, {
        where: {
            id: recommendationId,
        },
        populate: '*',
    });
    const userTelegramId = query.from.id;
    const userFirstName = query.from.first_name;
    const agentFirstName = recommendation.agent.agentUsername;
    const agentTelegramId = recommendation.agent.telegramId;
    const chatTitle = `Address: ${recommendation.address}`;
    axios({
        url: 'https://1337-ysset-telegramapi-2junh60whyn.ws-eu43.gitpod.io/api/create/flatchat',
        method: 'POST',
        data: {
            userId: userTelegramId,
            agentId: agentTelegramId,
            title: chatTitle,
            description: chatTitle,
            userFirstName,
            agentFirstName,
        },
    });
};
