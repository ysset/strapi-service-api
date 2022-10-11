const path = require('path');
const fs = require('fs');
const actions = require('../actions');
module.exports = async (query) => {
    let {
        user,
        localisation,
        chatId,
        data: { table },
    } = query;
    if (!user[`watched${table}`].length)
        return await strapi.bots.alanyaBot.sendMessage(
            chatId,
            'Это была первая квартира которую вы просмотрели'
        );
    const flatId = user[`watched${table}`].pop().id;
    let object = await strapi.entityService.findOne(
        `api::${table.toLowerCase()}.${table.toLowerCase()}`,
        flatId,
        {
            populate: {
                localisation: {
                    populate: {
                        apartments: true,
                        infrastructure: true,
                        apartmentEquipment: true,
                        floors: true,
                    },
                },
                layoutPhoto: true,
                agent: true,
            },
        }
    );

    object.localisation = object.localisation.find((el) => el.language === 'ru');

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        object.layoutPhoto[0].url ? object.layoutPhoto[0].url : object.layoutPhoto[0].formats.large.url
    }`;

    const caption = localisation.SHORT_DESCRIPTION[table.toLowerCase()](object.localisation, object.favorite);
    await strapi.bots.alanyaBot
        .sendPhoto(chatId, fs.createReadStream(resolvedPath), {
            caption,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.PREVIOUS_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.PREVIOUS_FLAT,
                                flatId,
                                table,
                            }),
                        },
                        {
                            ...localisation?.NEXT_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FLATS,
                                table,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.FULL_DESCRIPTION,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FULL_DESCRIPTION,
                                flatId,
                                table,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.SAVE_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SAVE,
                                flatId,
                                table,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.WRITE_INLINE[table.toLowerCase()],
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_WRITE_AGENT,
                                flatId,
                                table,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });
    await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
        data: {
            [`watched${table}`]: user[`watched${table}`].filter((el) => el.id !== flatId),
        },
    });
};
