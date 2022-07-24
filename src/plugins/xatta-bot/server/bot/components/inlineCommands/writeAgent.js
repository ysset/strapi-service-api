module.exports = async (query) => {
    const {
        user: { telegramID, username },
    } = query;
    const [api, recommendationId] = query.data.recommendationKey.split('/');
    const recommendation = await strapi.entityService.findOne(api, recommendationId, {
        populate: '*',
    });

    const agentUsername = recommendation.agent.username;
    const agentTelegramId = recommendation.agent.telegramId;
    const text = `${username} вот ссылка на риелтора https://t.me/${agentUsername}. \nПожалуйста напишите ему =)`;
    const realtorMessage = ` ${agentUsername} пользователь https://t.me/${query.from.username} интересуется вашей квартирой.`;
    const orderInfo = ` Квартира: \nid: ${recommendation.id} \nНазвание: ${recommendation.title} \nЦена: ${recommendation.cost} \nАдрес: ${recommendation.address} \nРасположение: ${recommendation.locationUrl} \n${recommendation.action} ${recommendation.type}, комнат: ${recommendation.rooms}`;

    await strapi.bots.alanyaBot.sendMessage(telegramID, text).catch((e) => {
        console.error(e);
    });

    await strapi.bots.alanyaBot.sendMessage(agentTelegramId, `${realtorMessage} ${orderInfo}`).catch((e) => {
        console.error(e);
    });
};
