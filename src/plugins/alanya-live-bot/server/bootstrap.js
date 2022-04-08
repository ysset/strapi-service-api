'use strict';

const TgBot = require('node-telegram-bot-api');
const bot = new TgBot('5260363790:AAH_slB9_2RRCEWWqaEBg9pmgyaWc5KFoVw', { polling: true });
const { commands, inlineCallBacks } = require('./utils/components');

module.exports = async ({ strapi }) => {
    strapi.bots.alanyaBot = bot;
    await strapi.bots.alanyaBot.setMyCommands([
        {
            command: '/start',
            description: 'Старт',
        },
        {
            command: '/help',
            description: 'Помощь',
        },
    ]);

    strapi.bots.alanyaBot.onText(commands.START.regex, commands.START.fn);

    strapi.bots.alanyaBot.on('callback_query', async (query) => {
        query.data = JSON.parse(query.data);
        return await inlineCallBacks[query.data.action](query);
    });

    console.log('Alanya Live Bot Connected!');
};
