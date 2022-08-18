const recommendations = require('../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    const {
        user: { telegramID: userTelegramId, username },
        localisation,
        data,
        user,
        chatId,
        messageId,
    } = query;

    const { table, flatId } = data;
    const api = `api::${table.toLowerCase()}.${table.toLowerCase()}`;
    const recommendation = await strapi.entityService.findOne(api, flatId, { populate: '*' });

    const agentUsername = recommendation.agent.username;
    const agentTelegramId = recommendation.agent.telegramID;

    let recLocalisation = {
        ...recommendation,
        localisation: recommendation.localisation.find((rec) => rec.language === localisation.lang),
    };

    if (!recLocalisation.localisation)
        recLocalisation.localisation = recommendation.localisation.find((rec) => rec.language === 'en');

    //get localisation
    const userMessage = localisation.WRITE_AGENT.userText(username, agentUsername);
    const realtorMessage = localisation.WRITE_AGENT.realtorText(username, agentUsername);
    const orderInfo = localisation.WRITE_AGENT.orderInfo(recLocalisation.localisation);

    //save current housing
    await recommendations
        .save({
            where: {
                telegramID: query.from.id,
            },
            apiKey: 'api::telegram-user.telegram-user',
            data,
            user,
        })
        .catch(console.error);

    await strapi.bots.alanyaBot
        .editMessageReplyMarkup(
            {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.FULL_DESCRIPTION,
                            callback_data: JSON.stringify({
                                action: 'FULL_DESCRIPTION',
                                table,
                                flatId: recLocalisation.id,
                            }),
                        },
                    ],
                ],
            },
            {
                chat_id: chatId,
                message_id: messageId,
            }
        )
        .catch(console.error);

    await strapi.bots.alanyaBot
        .sendMessage(userTelegramId, `${userMessage}\n\n${orderInfo}`)
        .catch(console.error);

    await strapi.bots.admin
        .sendMessage(agentTelegramId, `${realtorMessage}\n\n${orderInfo}`)
        .catch(console.error);
};
