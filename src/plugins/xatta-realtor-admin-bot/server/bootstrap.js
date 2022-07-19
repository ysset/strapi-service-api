'use strict';
process.env.NTBA_FIX_319 = 1;

const TgBot = require('node-telegram-bot-api');
const bot = new TgBot(process.env.XATTA_ADMIN_BOT_API_KEY, { polling: true });

const { commands, inlineCallBacks } = require('./bot/components');
const getUser = require('../botUtils/userController');
const { userLang } = require('../botUtils/language');

module.exports = async ({ strapi }) => {
    strapi.bots.admin = bot;
    await strapi.bots.admin.setMyCommands([
        {
            command: '/start',
            description: 'start',
        },
        {
            command: '/help',
            description: 'start',
        },
    ]);

    strapi.bots.admin.onText(commands.START.regex, commands.START.fn);

    strapi.bots.admin.on('callback_query', async (query) => {
        query.data = JSON.parse(query.data);
        const user = await getUser({ msg: query });
        const localisation = userLang(user.language);
        return await inlineCallBacks[query.data.action]({ ...query, user, localisation });
    });

    strapi.bots.admin.on('polling_error', (msg) => console.log(msg));

    console.log('Xatta admin is ready!');
};
