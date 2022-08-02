module.exports = async (query) => {
    const {
        user: { telegramID: userTelegramId, username },
        localisation,
    } = query;
    const [api, recommendationId] = query.data.rec.split('/');
    const recommendation = await strapi.entityService.findOne(api, recommendationId, {
        populate: '*',
    });

    const agentUsername = recommendation.agent.username;
    const agentTelegramId = recommendation.agent.telegramID;
    const text = localisation.WRITE_AGENT.userText(username, agentUsername);
    const realtorMessage = localisation.WRITE_AGENT.realtorText(username, agentUsername);
    const orderInfo = localisation.WRITE_AGENT.orderInfo(recommendation);

    await strapi.bots.alanyaBot.sendMessage(userTelegramId, `${text}\n\n${orderInfo}`).catch((e) => {
        console.error(e);
    });

    await strapi.bots.admin.sendMessage(agentTelegramId, `${realtorMessage}\n\n${orderInfo}`).catch((e) => {
        console.error(e);
    });
};
