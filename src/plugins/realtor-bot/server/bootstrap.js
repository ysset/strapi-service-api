'use strict';
process.env.NTBA_FIX_319 = 1;

const TgBot = require('node-telegram-bot-api');
const { tokens, languages } = require('../../utils/getBotToken')('REALTOR_BOT_TOKEN');

const eventStorage = require('../../utils/event/eventStorage');
const { commands, inlineCallBacks } = require('./bot/components');
const { modifyRequestWithUserData } = require('../../utils');

module.exports = async () => {
    for (let token of tokens) {
        const bot = await new TgBot(token, { polling: true });
        bot.language = languages[token];
        bot.type = 'realtor';

        strapi.log.info(`Registering telegram bot for token: ${token}`);
        await bot.setMyCommands([
            {
                command: 'start',
                description: 'Добро пожаловать',
            },
            {
                command: 'help',
                description: 'Помощь',
            },
        ]);

        bot.onText(commands.START.regex, async (msg) =>
            commands.START.fn(await modifyRequestWithUserData({ msg, bot }))
        );

        bot.on('callback_query', async (query) => {
            try {
                query.data = JSON.parse(query.data);
                const data = await modifyRequestWithUserData({ msg: query, bot });
                //debug shit
                console.log('===START====>', '\nACTION:', query.data.action, '\nUSER_ID:', data.user.id);
                await inlineCallBacks[query.data.action](data);
                console.log('===END====>');
            } catch (e) {
                console.error(e);
            }
        });

        bot.on('polling_error', (e) => console.error(e));

        /**
         * contact listener
         */
        bot.on('contact', async (msg) => {
            if (eventStorage.isEvent(msg.from.id)) {
                const event = eventStorage.callEvent(msg.from.id);
                await event(msg);
            }
        });

        bot.on('message', async (query) => {
            if (query.web_app_data) {
                return inlineCallBacks.SEARCH_FLATS(await modifyRequestWithUserData({ msg: query, bot }));
            }
            if (query.text === 'Сохраненные ❤️') {
                return inlineCallBacks.FAVORITE_HOUSINGS(
                    await modifyRequestWithUserData({ msg: query, bot })
                );
            }
            if (query.text === 'Saved ❤️') {
                return inlineCallBacks.FAVORITE_HOUSINGS(
                    await modifyRequestWithUserData({ msg: query, bot })
                );
            }
            if (query.text === 'Хочу на бесплатный обзорный тур 🚀!') {
                return inlineCallBacks.INF_TOUR(await modifyRequestWithUserData({ msg: query, bot }));
            }
            if (query.text === 'I want to take a free tour 🚀!') {
                return inlineCallBacks.INF_TOUR(await modifyRequestWithUserData({ msg: query, bot }));
            }
            if (query.text === 'Поиск 🔍') {
                return inlineCallBacks.SEARCH_FLATS(await modifyRequestWithUserData({ msg: query, bot }));
            }
            if (query.text === 'Search 🔍') {
                return inlineCallBacks.SEARCH_FLATS(await modifyRequestWithUserData({ msg: query, bot }));
            }

            if (
                query.text === 'start' ||
                query.text === 'старт' ||
                query.text === 'Start' ||
                query.text === 'Старт'
            ) {
                return commands.START.fn(await modifyRequestWithUserData({ msg: query, bot })).catch(
                    console.error
                );
            }
        });
        strapi.log.info(`Registering telegram bot for token: ${token}`);
    }
    strapi.log.warn('Realtor Telegram bot registered successfully');
};
