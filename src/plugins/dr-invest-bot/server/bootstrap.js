'use strict';

const TgBot = require('node-telegram-bot-api');
const bot = new TgBot('5279208722:AAFnrLQ1HOZgtAmA0M2ybgWGZbM7X9fmpmI', { polling: true });
const { commands, inlineCallBacks } = require('./utils/components');

module.exports = async ({ strapi }) => {
    strapi.bots.drInvest = bot;
    await strapi.bots.drInvest.setMyCommands([
        {
            command: '/start',
            description: 'Повторный взлет?',
        },
        {
            command: '/help',
            description: 'Пояснительная бригада',
        },
    ]);

    strapi.bots.drInvest.onText(commands.START.regex, commands.START.fn);

    strapi.bots.drInvest.on('callback_query', async (query) => {
        query.data = JSON.parse(query.data);
        return await inlineCallBacks[query.data.action](query);
    });

    console.log('DR Invest Bot Connected!');
};
