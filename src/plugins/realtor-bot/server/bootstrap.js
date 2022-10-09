'use strict';
process.env.NTBA_FIX_319 = 1;

const TgBot = require('node-telegram-bot-api');
const bot = new TgBot(process.env.REALTOR_BOT_API_KEY, { polling: true });

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
            //debug shit
            console.log('===START====>', '\nACTION:', query.data.action, '\nUSER_ID:', data.user.id);
            console.log(data.data);
            await inlineCallBacks[query.data.action](data);
            console.log('===END====>');
        } catch (e) {
            console.error(e);
        }
    });

    bot.on('polling_error', console.error);

    bot.on('message', async (query) => {
        if (query.web_app_data) {
            const data = JSON.parse(query.web_app_data.data);

            if (data.favorite)
                return inlineCallBacks.FAVORITE_HOUSINGS(await modifyRequestWithUserData({ msg: query }));

            return inlineCallBacks.SEARCH_FLATS({
                filters: data,
                ...(await modifyRequestWithUserData({ msg: query })),
            });
        }

        if (
            query.text === 'start' ||
            query.text === 'старт' ||
            query.text === 'Start' ||
            query.text === 'Старт'
        ) {
            return commands.START.fn(await modifyRequestWithUserData({ msg: query })).catch(console.error);
        }
    });

    console.log('REALTOR is ready!');
};
