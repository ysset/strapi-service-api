const fs = require('fs');
const path = require('path');
const actions = require('../actions');
module.exports = async (query) => {
    const {
        data: { log, table },
        chatId,
        localisation,
        messageId,
    } = query;
    const logField = await strapi.entityService
        .findOne('api::log.log', log, {
            populate: {
                user: true,
                agent: true,
                [table.toLowerCase()]: true,
            },
        })
        .catch(console.error);

    const flat = await strapi.entityService
        .findOne(`api::${table.toLowerCase()}.${table.toLowerCase()}`, logField[table.toLowerCase()].id, {
            populate: {
                localisation: {
                    populate: {
                        apartments: true,
                    },
                },
                layoutPhoto: true,
                agent: true,
            },
        })
        .catch(console.error);

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        flat.layoutPhoto[0].url ? flat.layoutPhoto[0].url : flat.layoutPhoto[0].formats.large.url
    }`;
    let flatLocal = flat.localisation.find((rec) => rec.language === localisation.lang);
    if (!flatLocal) flatLocal = flat.localisation.find((rec) => rec.language === 'ru');

    const caption = localisation.SHORT_DESCRIPTION[table](flatLocal);

    await strapi.entityService
        .update('api::log.log', log, {
            data: {
                canceled: true,
            },
        })
        .catch(console.error);

    strapi.bots.alanyaBot
        .editMessageReplyMarkup(
            {
                inline_keyboard: [[]],
            },
            {
                chat_id: chatId,
                message_id: messageId,
            }
        )
        .catch(console.error);
    await strapi.bots.alanyaBot
        .sendMessage(chatId, localisation.CANCEL_INTEREST.user, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation.COMPLETE_SEARCHING,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FLATS,
                                table,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch(console.error);

    await strapi.bots.admin
        .sendMessage(
            logField.agent.telegramID,
            localisation.CANCEL_INTEREST.realtor({
                ...query.user,
                flatId: logField[table.toLowerCase()].id,
            })
        )
        .catch(console.error);
    await strapi.bots.admin
        .sendPhoto(logField.agent.telegramID, fs.createReadStream(resolvedPath), {
            caption,
            parse_mode: 'HTML',
        })
        .catch(console.error);
};
