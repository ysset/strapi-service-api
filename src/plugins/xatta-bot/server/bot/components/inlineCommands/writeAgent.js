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

    await strapi.bots.alanyaBot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    {
                        ...localisation?.FULL_DESCRIPTION,
                        callback_data: JSON.stringify({
                            action: 'FULL_DESCRIPTION',
                            flat: `api::${table.toLowerCase()}.${table.toLowerCase()}/${flatId}`,
                        }),
                    },
                ],
            ],
        },
        {
            chat_id: chatId,
            message_id: messageId,
        }
    );

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
                                action: 'ENTER_COMMAND',
                            }),
                        },
                        {
                            text: 'Continue searching?',
                            callback_data: JSON.stringify({
                                action: 'SEARCH_FLATS',
                                table,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => console.log(e));
};
