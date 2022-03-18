const {lang, userLang} = require('./lang');

const commands = {
  START: {
    regex: /\/start/,
    fn: async (msg) => {
      const chatId = msg.chat.id;
      const messageId = msg.message_id;
      lang.currLang = msg.from.language_code;
      commands.FAVORITE.regex = userLang().FAVORITE.regex;
      commands.SEARCH_FLAT.regex = userLang().SEARCH_FLAT.regex;

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
            language: lang.currLang
          }
        });

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
          strapi.bot.onText(commands[command].regex, commands[command].fn)
        }
    },
  },

  FAVORITE: {regex: userLang()?.FAVORITE.regex, fn: async (msg) => {
      lang.currLang = msg.from.language_code;
      const chatId = msg.chat.id;

      const user = await strapi.entityService.findOne('api::telegram-user.telegram-user', 1, {
        where: {
          telegramID: msg.from.id
        },
        populate: "*",
      });

      if (!user)
        return await strapi.bot.sendMessage(chatId, userLang().UN_AUTHORIZE);

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
        return await strapi.bot.sendPhoto(chatId, product.layoutPhoto, {
          reply_markup: {
            keyboard: [
              [userLang().SEARCH_FLAT]
            ],
            inline_keyboard: [
              [userLang().WRITE_AGENT_INLINE],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          }
        })
      }
    },},

  SEARCH_FLAT: {
    regex: userLang()?.SEARCH_FLAT.regex,
    fn: async (msg) => {
      const chatId = msg.chat.id;
      await strapi.bot.sendMessage(chatId, "Салат малекулы", {
        reply_markup: {
          inline_keyboard: [
            [userLang().SAVE_INLINE, userLang().NEXT_INLINE],
            [userLang().WRITE_AGENT_INLINE],
          ],
          keyboard: [
            [userLang().FAVORITE]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }
      });
    }
  }
};

// const onReply = (chatId, messageId) => {
//     for (const replyButton in replyButtons) {
//         bot.onReplyToMessage(chatId, messageId, replyButtons[replyButton].fn);
//     }
// }

// const replyButtons = {
//     NEXT: {
//         fn: async (/*msg*/) => {
//
//         },
//     },
//     LIKE: {
//         fn: async (/*msg*/) => {
//
//         },
//     },
// };

module.exports = {
  commands
}
