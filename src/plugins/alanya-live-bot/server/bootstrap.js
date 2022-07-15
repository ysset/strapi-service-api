'use strict';
const TgBot = require('node-telegram-bot-api');
const botApiKey = '5319870017:AAEYdqXOsmTh3doopKyBZIAKiJoMg5nxeYg';
const bot = new TgBot(botApiKey, { polling: true });
const { commands, inlineCallBacks } = require('./utils/components');
const isUser = require('../../botUtils/userController');
const { userLang } = require('../../botUtils/botsLanguages');

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
        const localisation = userLang(user.language);
        return await inlineCallBacks[query.data.action]({ ...query, user, localisation });
    });

    console.log('Alanya Live Bot Connected!');
};
