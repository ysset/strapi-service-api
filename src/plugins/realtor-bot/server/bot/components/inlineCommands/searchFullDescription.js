const fullDescription = require('./fullDescription');
const actions = require('../actions');

module.exports = async (bot) => {
    const {
        localisation,
        chatId,
        data: { table, flatId },
        user,
    } = bot;

    const favorites = [
        ...user.favoriteVilla,
        ...user.favoriteOwner,
        ...user.favoriteComplex,
        ...user.favoriteRent,
    ];

    const isFlatFavorite = favorites.find((el) => el.id === flatId);
    console.log(isFlatFavorite, favorites, user);
    const inline_keyboard = [
        [
            {
                ...localisation?.WRITE_INLINE[table.toLowerCase()],
                callback_data: JSON.stringify({
                    action: actions.SEARCH_WRITE_AGENT_FOR_FULL_DESCRIPTION,
                    table,
                    flatId,
                }),
            },
        ],
        !isFlatFavorite
            ? [
                  {
                      ...localisation?.SAVE_INLINE,
                      callback_data: JSON.stringify({
                          action: actions.SAVE,
                          table,
                          flatId,
                      }),
                  },
                  {
                      ...localisation?.NEXT_INLINE,
                      callback_data: JSON.stringify({
                          action: actions.SFDNF,
                          table,
                          flatId,
                      }),
                  },
              ]
            : [
                  {
                      ...localisation?.NEXT_INLINE,
                      callback_data: JSON.stringify({
                          action: actions.SFDNF,
                          table,
                          flatId,
                      }),
                  },
              ],
    ];
    const { caption, messages } = await fullDescription(bot);
    const { message_id: callbackMessage } = await bot
        .sendMessage(chatId, caption, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard,
            },
        })
        .catch(console.error);

    await strapi.entityService.create('api::message-history.message-history', {
        data: {
            flatInfo: `${table}/${flatId}`,
            callbackMessage,
            messages,
        },
        populate: '*',
    });
    bot.delete();
};
