const {lang, userLang} = require('../../../../botUtils/botsLanguages');
const infinityQueue = require('../../../../botUtils/botManager/recomendationManager');
const {drInvest} = require('../../../../botUtils/errorHandlers');
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
      commands.SEARCH_FLATS.regex = userLang().SEARCH_FLATS.regex;

      await strapi.bots.drInvest.clearTextListeners();
      await strapi.bots.drInvest.sendMessage(chatId, userLang().WELCOME.drInvest, {
        reply_markup: {
          keyboard: [
            [userLang().FAVORITE, userLang().SEARCH_FLATS]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }
      });
      await strapi.bots.drInvest.deleteMessage(chatId, messageId);
      if (lang.currLang)
        for (const command in commands) {
          strapi.bots.drInvest.onText(commands[command].regex, commands[command].fn);
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

      if (user.flats.length === 0) {
        return await strapi.bots.drInvest.sendMessage(chatId, userLang().NO_FAVORITE_NOW.flat, {
          reply_markup: {
            keyboard: [
              [userLang().FAVORITE, userLang().SEARCH_FLATS]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          }
        });
      }

      const flats = await strapi.db.query("api::flat.flat").findMany({
        where: {
          id: {
            $in: user.flats.map(el => el.id)
          }
        },
        populate: true,
      })

      for (const flat of flats) {
        await strapi.bots.drInvest.sendPhoto(chatId, `/Users/ysset/WebstormProjects/tgBotStrapi/public${flat.layoutPhoto[0].formats.large.url}`, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  ...userLang().WRITE_AGENT_INLINE,
                  callback_data: JSON.stringify({
                    action: "WRITE_AGENT",
                    agentUsername: flat.agent.agentUsername
                  })
                }
              ]
            ],
          }
        });
      }

      await strapi.bots.drInvest.sendMessage(chatId, 'Ищем дальше?', {
        reply_markup: {
          keyboard: [
            [userLang().SEARCH_FLATS]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }
      })
    }
  },

  SEARCH_FLATS: {
    regex: userLang()?.SEARCH_FLATS.regex,
    fn: async (msg) => {
      const chatId = msg.chat.id;

      const user = await isUser({msg});

      if (!user)
        return;

      const rec = await recommendations.get({
        user,
        filter: {
          type: "FLATS",
          api: "api::flat.flat"
        }
      });

      if (!rec)
        await drInvest.NO_FLATS(chatId);

      if (!rec.agent.agentUsername)
        await drInvest.SERVER_ERROR(chatId);

      const photo = rec.layoutPhoto;
      const photoUrl = `/Users/ysset/WebstormProjects/tgBotStrapi/public${photo[0].formats.large.url}`;

      await strapi.bots.drInvest.sendPhoto(chatId, photoUrl, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                ...userLang().SAVE_INLINE,
                callback_data: JSON.stringify({
                  action: "SAVE",
                  type: "FLATS",
                  recId: rec.id
                })
              },
              {
                ...userLang().NEXT_INLINE,
                callback_data: JSON.stringify({
                  action: "NEXT",
                  type: "FLATS",
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

    await strapi.bots.drInvest.deleteMessage(chatId, query.message.message_id);
    return await commands.SEARCH_FLATS.fn({
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
    return await commands.SEARCH_FLATS.fn({
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
