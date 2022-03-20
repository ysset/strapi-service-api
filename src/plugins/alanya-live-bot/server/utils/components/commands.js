const {lang, userLang} = require('../../../../botUtils/botsLanguages');
const infinityQueue = require('../../../../botUtils/botManager/recomendationManager');
const { alanyaBot } = require('../../../../botUtils/errorHandlers');
const isUser = require('../../../../botUtils/userController');
const recommendations = new infinityQueue();

const commands = {
  START: {
    regex: /\/start/,
    fn: async (msg) => {
      const chatId = msg.chat.id;
      const messageId = msg.message_id;

      await isUser({msg});
      commands.FAVORITE.regex = userLang().FAVORITE.regex;
      commands.SEARCH_FLAT.regex = userLang().SEARCH_FLAT.regex;

      await strapi.bots.alanyaBot.clearTextListeners();
      await strapi.bots.alanyaBot.sendMessage(chatId, userLang().WELCOME.alanyaBot, {
        reply_markup: {
          keyboard: [
            [userLang().FAVORITE, userLang().SEARCH_FLAT]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }
      });
      await strapi.bots.alanyaBot.deleteMessage(chatId, messageId);
      if (lang.currLang)
        for (const command in commands) {
          strapi.bots.alanyaBot.onText(commands[command].regex, commands[command].fn);
        }
    },
  },

  FAVORITE: {
    regex: userLang()?.FAVORITE.regex,
    fn: async (msg) => {
      lang.currLang = msg.from.language_code;
      const chatId = msg.chat.id;

      const user = await isUser({msg});

      if (!user)
        return;

      if (user.favorite.length === 0) {
        return await strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_FAVORITE_NOW, {
          reply_markup: {
            keyboard: [
              [userLang().FAVORITE, userLang().SEARCH_FLAT]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          }
        });
      }

      const favorite = await strapi.db.query("api::product.product").findMany({
        where: {
          id: {
            $in: user.favorite.map(el => el.id)
          }
        },
        populate: true,
      })

      for (const product of favorite) {
        await strapi.bots.alanyaBot.sendPhoto(chatId, `/Users/ysset/WebstormProjects/tgBotStrapi/public${product.layoutPhoto[0].formats.large.url}`, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  ...userLang().WRITE_AGENT_INLINE,
                  callback_data: JSON.stringify({
                    action: "WRITE_AGENT",
                    agentUsername: product.agent.agentUsername
                  })
                }
              ]
            ],
          }
        });
      }

      await strapi.bots.alanyaBot.sendMessage(chatId, 'Ищем дальше?', {
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

      const user = await isUser({msg});

      if (!user)
        return;

      const rec = await recommendations.get({
        user,
        filter: {
          type: "FLATS",
          api: "api::car.car"
        }
      });

      if (!rec)
        await alanyaBot.NO_FLATS();

      if (!rec.agent.agentUsername)
        await alanyaBot.SERVER_ERROR();

      const photo = rec.layoutPhoto;
      const photoUrl = `/Users/ysset/WebstormProjects/tgBotStrapi/public${photo[0].formats.large.url}`;

      await strapi.bots.alanyaBot.sendPhoto(chatId, photoUrl, {
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
  },

  SEARCH_CAR: {
    regex: userLang()?.SEARCH_CAR.regex,
    fn: async (msg) => {
      const chatId = msg.chat.id;

      const user = await isUser({msg});

      if (!user)
        return;

      const rec = await recommendations.get({
        user,
        filter: {
          type: "CARS",
          api: "api::car.car"
        }
      });

      if (!rec)
        await alanyaBot.NO_CARS();

      if (!rec.agent.agentUsername)
        await alanyaBot.SERVER_ERROR();

      const photo = rec.layoutPhoto;
      const photoUrl = `/Users/ysset/WebstormProjects/tgBotStrapi/public${photo[0].formats.large.url}`;

      await strapi.bots.alanyaBot.sendPhoto(chatId, photoUrl, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                ...userLang().SAVE_INLINE,
                callback_data: JSON.stringify({
                  action: "SAVE",
                  type: "CARS",
                  recId: rec.id
                })
              },
              {
                ...userLang().NEXT_INLINE,
                callback_data: JSON.stringify({
                  action: "NEXT",
                  type: "CARS",
                })
              }
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

    const user = await isUser({msg: query});

    if (!user)
      return;

    await strapi.bots.alanyaBot.deleteMessage(chatId, query.message.message_id);
    return await commands.SEARCH_FLAT.fn({
      ...query.message,
      from: query.from
    })
  },
  SAVE: async (query) => {
    const user = await isUser({msg: query});

    if (!user)
      return;

    await recommendations.save({
      filter: {
        where: {
          key: "telegramID",
          value: query.from.id
        },
        apiKey: "api::telegram-user.telegram-user"
      },
      data: query.data
    });

    return await commands.SEARCH_FLAT.fn({
      ...query.message,
      from: query.from
    })
  },
  WRITE_AGENT: {},
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
