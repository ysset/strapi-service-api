const { getFilePath, actions, getUser } = require('../utils');
const fs = require('fs');

module.exports = async ({ bot, object }) => {
    const { chatId, localisation } = bot;
    const { user } = await getUser(bot);
    const { flatId } = object;
    const table = object.table.toLowerCase();
    const path = getFilePath(object);
    const caption = localisation.SHORT_DESCRIPTION(object);

    await strapi.bots.rent
        .sendPhoto(chatId, fs.createReadStream(path), {
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
                                table,
                                flatId,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.SAVE_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SAVE,
                                table,
                                flatId,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.WRITE_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_WRITE_AGENT,
                                table,
                                flatId,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });

    await strapi.entityService
        .update('api::telegram-user.telegram-user', user.id, {
            data: {
                watchedRent: [...user.watchedRent, flatId],
            },
        })
        .catch(console.error);
};
