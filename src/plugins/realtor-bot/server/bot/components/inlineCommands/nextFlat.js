const searchFlats = require('./searchFlats');
const actions = require('../actions');

const getKeyboard = ({ favorite, localisation, table, flatId }) => {
    if (favorite)
        return [
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
                    ...localisation?.WRITE_INLINE[table.toLowerCase()],
                    callback_data: JSON.stringify({
                        action: actions.SEARCH_WRITE_AGENT,
                        table,
                        flatId,
                    }),
                },
            ],
        ];
    return [
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
                ...localisation?.WRITE_INLINE[table.toLowerCase()],
                callback_data: JSON.stringify({
                    action: actions.SEARCH_WRITE_AGENT,
                    table,
                    flatId,
                }),
            },
        ],
    ];
};

module.exports = async (bot) => {
    const { table, flatId } = bot.data;
    const { localisation, chatId, messageId, user } = bot;
    const favorites = {
        Complex: user.favoriteComplex,
        Villa: user.favoriteVilla,
        Owner: user.favoriteOwner,
    };
    console.log(favorites[table], flatId);
    const favorite = favorites[table].some((o) => o.id === flatId);
    await bot.editMessageReplyMarkup(
        {
            inline_keyboard: getKeyboard({
                localisation,
                flatId,
                favorite,
                table,
            }),
        },
        {
            chat_id: chatId,
            message_id: messageId,
        }
    );
    return searchFlats(bot);
};
