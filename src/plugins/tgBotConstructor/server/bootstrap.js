'use strict';

const TgBot = require("node-telegram-bot-api");
const bot = new TgBot("5279208722:AAFnrLQ1HOZgtAmA0M2ybgWGZbM7X9fmpmI", {polling: true});
const { commands, recommendations } = require('./utils/components');

const inlineCallBacks = {
  NEXT: async (query) => {
    console.log(query)
    await strapi.bot.deleteMessage(query.message.chat.id, query.message.message_id);
    return await commands.SEARCH_FLAT.fn({
      ...query.message,
      from: query.from
    })
  },
  SAVE: async (query) => {
    await recommendations.save({
      ...query.message,
      from: query.from
    });
  },
  WRITE_AGENT: {

  },
}

module.exports = async ({strapi}) => {
  strapi.bot = bot;
  await strapi.bot.setMyCommands([
    {
      command: '/start',
      description: 'Повторный взлет?'
    },
    {
      command: '/help',
      description: 'Пояснительная бригада'
    }
  ]);

  strapi.bot.onText(commands.START.regex, commands.START.fn);

  strapi.bot.on('callback_query', async (query) => {
    return await inlineCallBacks[query.data](query);
  });

  console.log('Bot Connected!');
};
