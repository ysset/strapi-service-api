const recommendations = require('../../../../botUtils/botManager/recomendationManager');

module.exports = async (query) => {
    const {
        user: { telegramID: userTelegramId, username },
        localisation,
        data,
        user,
    } = query;

    const { table, flatId } = data;
    const api = `api::${table.toLowerCase()}.${table.toLowerCase()}`;
    const flat = await strapi.entityService.findOne(api, flatId, { populate: '*' });

    const agentUsername = flat.agent.username;
    const agentTelegramId = flat.agent.telegramID;

    let recLocalisation = flat.localisation.find((rec) => rec.language === localisation.lang);

    if (!recLocalisation) recLocalisation = flat.localisation.find((rec) => rec.language === 'en');

    //get localisation
    const userMessage = localisation.WRITE_AGENT.userText[table.toLowerCase()]({
        agentUsername,
        flatId,
        ...recLocalisation,
    });
    const realtorMessage = localisation.WRITE_AGENT.realtorText({ username, flatId, ...recLocalisation });

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

    await strapi.bots.alanyaBot.sendMessage(userTelegramId, userMessage).catch(console.error);
    await strapi.bots.admin.sendMessage(agentTelegramId, realtorMessage).catch(console.error);
};
