const recommendations = require('../../../../botUtils/botManager/recomendationManager');
const path = require('path');
const fs = require('fs');
const actions = require('../actions');
const { getUser } = require('../../../../botUtils/userController');

module.exports = async (query) => {
    const {
        user: { telegramID: userTelegramId },
        localisation,
        data,
    } = query;

    let { table, flatId } = data;
    table = table.toLowerCase();
    const api = `api::${table}.${table}`;

    const flat = await strapi.entityService.findOne(api, flatId, {
        populate: {
            localisation: {
                populate: {
                    apartments: true,
                },
            },
            layoutPhoto: true,
            agent: true,
        },
    });

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        flat.layoutPhoto[0].url ? flat.layoutPhoto[0].url : flat.layoutPhoto[0].formats.large.url
    }`;

    const agentUsername = flat.agent.username;
    const agentTelegramId = flat.agent.telegramID;
    let flatLocal = flat.localisation.find((rec) => rec.language === localisation.lang);
    if (!flatLocal) flatLocal = flat.localisation.find((rec) => rec.language === 'ru');

    const caption = localisation.SHORT_DESCRIPTION[table](flatLocal);

    const userMessage = localisation.WRITE_AGENT.userText[table.toLowerCase()]({
        agentUsername,
        flatId,
        ...flatLocal,
    });

    const { user } = await getUser(query);

    //save current housing
    await recommendations
        .save({
            where: { telegramID: query.from.id },
            apiKey: 'api::telegram-user.telegram-user',
            data,
            user,
        })
        .catch(console.error);

    const log = await strapi.entityService.create('api::log.log', {
        data: {
            [table]: flatId,
            agent: flat.agent.id,
            user: user.id,
        },
    });

    const realtorMessage = localisation.WRITE_AGENT.realtorText({
        ...user,
        flatId,
        ...flatLocal,
        table,
    });

    await strapi.bots.alanyaBot
        .sendMessage(userTelegramId, userMessage, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.CANCEL_INTEREST_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.CANCEL_INTEREST,
                                log: log.id,
                                table,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch(console.error);

    await strapi.bots.admin
        .sendMessage(agentTelegramId, realtorMessage, { parse_mode: 'HTML' })
        .catch(console.error);
    await strapi.bots.admin
        .sendPhoto(agentTelegramId, fs.createReadStream(resolvedPath), { caption, parse_mode: 'HTML' })
        .catch(console.error);

    await strapi.bots.admin
        .sendMessage('323320737', realtorMessage, { parse_mode: 'HTML' })
        .catch(console.error);
    await strapi.bots.admin
        .sendPhoto('323320737', fs.createReadStream(resolvedPath), { caption, parse_mode: 'HTML' })
        .catch(console.error);
};
