'use strict';

const TgBot = require("node-telegram-bot-api");
const bot = new TgBot("5279208722:AAFnrLQ1HOZgtAmA0M2ybgWGZbM7X9fmpmI", {polling: true});
const {commands} = require('./utils/components');

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
    await commands.SEARCH_FLAT.fn({
      ...query.message,
      from: query.from
    })
  });

  console.log('Bot Connected!');
};
