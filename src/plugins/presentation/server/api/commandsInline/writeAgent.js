const recommendations = require('../../../../realtor-bot/botUtils/botManager/recommendationManager');
const path = require('path');
const fs = require('fs');
const actions = require('../../../../utils/actions');
const { getUser } = require('../../utils/user');

module.exports = async (bot) => {
    const {
        user: { telegramID: userTelegramId },
        localisation,
        data,
    } = bot;

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

    const caption = localisation.shortDescription[table](flatLocal);

    const userMessage = localisation.writeAgent.userText[table.toLowerCase()]({
        agentUsername,
        flatId,
        ...flatLocal,
    });

    const { user } = await getUser(bot.msg);

    //save current housing
    await recommendations
        .save({
            where: { telegramID: bot.msg.from.id },
            apiKey: 'api::telegram-user.telegram-user',
            data,
            user,
        })
        .catch(console.error);

    const realtorMessage = localisation.writeAgent.realtorText({
        ...user,
        flatId,
        ...flatLocal,
        table,
    });

    await bot.reply(localisation.adminBotMsg);

    await bot.sendMessage(agentTelegramId, realtorMessage, { parse_mode: 'HTML' }).catch(console.error);
    await bot
        .sendPhoto(agentTelegramId, fs.createReadStream(resolvedPath), { caption, parse_mode: 'HTML' })
        .catch(console.error);

    await bot.reply(localisation.adminMsgDescription);

    await bot
        .sendMessage(userTelegramId, userMessage, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.CANCEL_INTEREST_INLINE,
                            callback_data: JSON.stringify(''),
                        },
                    ],
                ],
            },
        })
        .catch(console.error);

    await bot.reply(localisation.CancelInterestButtonDesc);
    await bot.reply(localisation.freeTourStart, {
        reply_markup: {
            keyboard: [
                [
                    {
                        ...localisation.CONTROL_PANEL,
                        callback_data: JSON.stringify(''),
                    },
                    {
                        ...localisation.FAVORITE,
                        callback_data: JSON.stringify(''),
                    },
                ],
                [
                    {
                        ...localisation.INF_TOUR_BUTTON,
                        callback_data: JSON.stringify({ action: actions.presentation.INF_TOUR }),
                    },
                ],
            ],
            resize_keyboard: true,
        },
    });
};
