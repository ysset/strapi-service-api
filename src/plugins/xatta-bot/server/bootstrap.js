'use strict';
process.env.NTBA_FIX_319 = 1;

const TgBot = require('node-telegram-bot-api');
const bot = new TgBot(process.env.BOT_API_KEY + '/test', { polling: true });

const { commands, inlineCallBacks } = require('./bot/components');
const { modifyRequestWithUserData } = require('../botUtils/userController');

module.exports = async ({ strapi }) => {
    strapi.bots.alanyaBot = bot;

    bot.onText(commands.START.regex, async (msg) =>
        commands.START.fn(await modifyRequestWithUserData({ msg }))
    );

    bot.on('callback_query', async (query) => {
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

    bot.on('polling_error', console.error);

    bot.on('message', async (query) => {
        if (query.web_app_data) {
            const data = JSON.parse(query.web_app_data.data);

            if (data.favorite) {
                return inlineCallBacks.FAVORITE(await modifyRequestWithUserData({ msg: query }));
            }

            const parsedData = {
                filters: data,
                ...(await modifyRequestWithUserData({ msg: query })),
            };

            return inlineCallBacks.SEARCH_FLATS(parsedData);
        }
    });

    console.log('Alanya Live Bot Connected!');
};
