const {lang, userLang} = require('./lang');
const infinityQueue = require('../botManager/recomendationManager');
const recommendations = new infinityQueue();

const isUser = async ({ msg }) => {
  const user = await strapi.entityService.findOne('api::telegram-user.telegram-user', 1, {
    where: {
      telegramID: msg.from.id
    },
    populate: "*",
  });


  if (!user)
    await strapi.entityService.create('api::telegram-user.telegram-user', {
      data: {
        telegramID: msg.from.id,
        language: lang.currLang,
        username: msg.from.username,
      }
    });

  lang.currLang = msg.from.language_code;
  commands.FAVORITE.regex = userLang().FAVORITE.regex;
  commands.SEARCH_FLAT.regex = userLang().SEARCH_FLAT.regex;

  return user;
};

const commands = {
  START: {
    regex: /\/start/,
    fn: async (msg) => {
      const chatId = msg.chat.id;
      const messageId = msg.message_id;

      await isUser({ msg });

      await strapi.bot.clearTextListeners();
      await strapi.bot.sendMessage(chatId, userLang().WELCOME, {
        reply_markup: {
          keyboard: [
            [userLang().FAVORITE, userLang().SEARCH_FLAT]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }
      });
      await strapi.bot.deleteMessage(chatId, messageId);
      if (lang.currLang)
        for (const command in commands) {
          strapi.bot.onText(commands[command].regex, commands[command].fn);
        }
    },
  },

  FAVORITE: {
    regex: userLang()?.FAVORITE.regex,
    fn: async (msg) => {
      lang.currLang = msg.from.language_code;
      const chatId = msg.chat.id;

      const user = await isUser({ msg });

      if (!user)
        return;

      if (user.favorite.length === 0)
        return await strapi.bot.sendMessage(chatId, userLang().NO_FAVORITE_NOW, {
          reply_markup: {
            keyboard: [
              [userLang().FAVORITE, userLang().SEARCH_FLAT]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          }
        });

      for (const product of user.favorite) {
        const photo = await strapi.entityService.findOne("api::product.product", 1, {
          where: {id: product.id},
          populate: '*',
        });

        await strapi.bot.sendPhoto(chatId, `/Users/ysset/WebstormProjects/tgBotStrapi/public${photo.layoutPhoto[0].formats.large.url}`, {
          reply_markup: {
            inline_keyboard: [
              [userLang().WRITE_AGENT_INLINE]
            ],
          }
        });
      }

      await strapi.bot.sendMessage(chatId, 'Ищем дальше?', {
        reply_markup: {
          keyboard: [
            [userLang().SEARCH_FLAT]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }
      })
    }
  },

  SEARCH_FLAT: {
    regex: userLang()?.SEARCH_FLAT.regex,
    fn: async (msg) => {
      const chatId = msg.chat.id;

      const user = await isUser({ msg });

      if (!user)
        return;

      const rec = await recommendations.get(user);
      const photo = rec.layoutPhoto;
      const photoUrl = `/Users/ysset/WebstormProjects/tgBotStrapi/public${photo[0].formats.large.url}`;

      await strapi.bot.sendPhoto(chatId, photoUrl, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                ...userLang().SAVE_INLINE,
                callback_data: JSON.stringify({
                  action: "SAVE",
                  recId: rec.id
                })
              },
              userLang().NEXT_INLINE
            ],
            [
              {
                ...userLang().WRITE_AGENT_INLINE,
                callback_data: JSON.stringify({
                  action: "WRITE_AGENT",
                  agentUsername: rec.agent.agentUsername
                })
              }
            ],
          ]
        }
      });
    }
  }
};

const inlineCallBacks = {
  NEXT: async (query) => {
    const chatId = query.message.chat.id;

    const user = await isUser({ msg: query });

    if (!user)
      return;

    await strapi.bot.deleteMessage(chatId, query.message.message_id);
    return await commands.SEARCH_FLAT.fn({
      ...query.message,
      from: query.from
    })
  },
  SAVE: async (query) => {
    const user = await isUser({ msg: query });

    if (!user)
      return;

    await recommendations.save({
      from: query.from,
      data: query.data
    });
    return await commands.SEARCH_FLAT.fn({
      ...query.message,
      from: query.from
    })
  },
  WRITE_AGENT: {

  },
}


/**
 * to send mach photos
 */
// for (let layout of photo.layoutPhoto) {
//   arrOfPhoto.push({
//     ...layout.formats.thumbnail,
//     media: `/Users/ysset/WebstormProjects/tgBotStrapi/public${layout.formats.large.url}`,
//     type: 'photo'
//   });
// }

module.exports = {
  commands,
  inlineCallBacks
}
