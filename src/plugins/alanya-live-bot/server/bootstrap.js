'use strict';

const TgBot = require('node-telegram-bot-api');
const bot = new TgBot('5148198018:AAFF92ZxwJRpkwTNivnAvH9dBWRrZjl5hJk', { polling: true });
const { commands, inlineCallBacks } = require('./utils/components');
const isUser = require('../../botUtils/userController');

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
        const user = await isUser({ msg: query });
        return await inlineCallBacks[query.data.action]({ ...query, user });
    });

    console.log('Alanya Live Bot Connected!');
};
