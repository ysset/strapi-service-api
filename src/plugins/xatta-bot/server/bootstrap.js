'use strict';
process.env.NTBA_FIX_319 = 1;

const TgBot = require('node-telegram-bot-api');
const bot = new TgBot(process.env.BOT_API_KEY, { polling: true });

const { commands, inlineCallBacks } = require('./bot/components');
const { modifyRequestWithUserData } = require('../botUtils/userController');

module.exports = async ({ strapi }) => {
    strapi.bots.alanyaBot = bot;
    strapi.bots.alanyaBot.onText(commands.START.regex, async (msg) =>
        commands.START.fn(await modifyRequestWithUserData({ msg }))
    );
    strapi.bots.alanyaBot.on('callback_query', async (query) => {
        try {
            query.data = JSON.parse(query.data);
            const data = await modifyRequestWithUserData({ msg: query });
            await inlineCallBacks[query.data.action](data).catch((e) => {
                console.error(e);
            });
        } catch (e) {
            console.error(e);
        }
    });
    strapi.bots.alanyaBot.on('polling_error', (msg) => console.log('polling_error', msg));
    console.log('Alanya Live Bot Connected!');
};
