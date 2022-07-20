'use strict';
process.env.NTBA_FIX_319 = 1;

const TgBot = require('node-telegram-bot-api');
const botApiKey = process.env.BOT_API_KEY;
const bot = new TgBot(botApiKey, { polling: true });
const { commands, inlineCallBacks } = require('./bot/components');
const isUser = require('../botUtils/userController');
const { userLang } = require('../botUtils/language');

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
        try {
            query.data = JSON.parse(query.data);
            const user = await isUser({ msg: query });
            const localisation = userLang(user.language);
            console.log(`${query.data.action} ${user.id}`);
            console.time();
            await inlineCallBacks[query.data.action]({ ...query, user, localisation });
            console.timeEnd();
            console.log('<=====>');
        } catch (e) {
            console.error(e);
        }
    });

    strapi.bots.alanyaBot.on('polling_error', (msg) => console.log('polling_error', msg));

    console.log('Alanya Live Bot Connected!');
};
