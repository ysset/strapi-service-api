const path = require('path');
const fs = require('fs');

const { getUser } = require('../../../../../utils');
const { NO_FLATS, SERVER_ERROR } = require('../../../../botUtils/errorHandlers');
const recommendations = require('../../../../botUtils/botManager/recommendationManager');
const actions = require('../actions');

module.exports = async (bot) => {
    const { localisation, chatId, msg, messageId } = bot;
    let { filters } = msg;
    let { user } = await getUser(msg);
    if (filters) filters = { ...filters, language: bot.language };
    let recommendation = await recommendations.get({ user, filters });
    if (!recommendation || !recommendation.localisation || !recommendation.localisation.length)
        return await NO_FLATS({ chatId, localisation, bot });

    let recLocalisation = {
        ...recommendation,
        localisation: recommendation.localisation.find(
            (rec) => rec.language === bot.language || rec.localisation === 'en'
        ),
    };

    if (!recLocalisation.layoutPhoto || recLocalisation.layoutPhoto.length === 0) {
        return await SERVER_ERROR({
            chatId,
            localisation,
            bot,
        });
    }

    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${
        recLocalisation.layoutPhoto[0].url
            ? recLocalisation.layoutPhoto[0].url
            : recLocalisation.layoutPhoto[0].formats.large.url
    }`;

    const table = recLocalisation.table.toLowerCase();
    const caption = localisation.SHORT_DESCRIPTION[table](
        recLocalisation.localisation,
        recommendation.favorite,
        recommendation.watched
    );

    await bot
        .sendPhoto(chatId, fs.createReadStream(resolvedPath), {
            caption,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.SAVE_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.SAVE,
                                table: recLocalisation.table,
                                flatId: recLocalisation.id,
                            }),
                        },
                        {
                            ...localisation?.NEXT_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.NEXT_FLAT,
                                table: recLocalisation.table,
                                flatId: recLocalisation.id,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.FULL_DESCRIPTION,
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_FULL_DESCRIPTION,
                                table: recLocalisation.table,
                                flatId: recLocalisation.id,
                            }),
                        },
                    ],
                    [
                        {
                            ...localisation?.WRITE_INLINE[table],
                            callback_data: JSON.stringify({
                                action: actions.SEARCH_WRITE_AGENT,
                                table: recLocalisation.table,
                                flatId: recLocalisation.id,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch((e) => {
            console.error(e);
        });

    return { ok: true };
};
