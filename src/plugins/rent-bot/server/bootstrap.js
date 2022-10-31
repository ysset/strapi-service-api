'use strict';
//connection lost fix
process.env.NTBA_FIX_319 = 1;

// Connect to bot API
const TgBot = require('node-telegram-bot-api');

const keys = Object.keys(process.env).filter((el) => el.includes('RENT_BOT_TOKEN'));
const tokens = keys.map((el) => process.env[el]);

const commands = require('./commands');
const { modifyRequestWithUserData } = require('./utils');
const { eventStorage } = require('./utils');
const inlineCallbacks = require('./inlineCallbacks');

module.exports = async () => {
    for (let token of tokens) {
        const bot = new TgBot(token, { polling: true });

        await bot.setMyCommands([
            {
                command: 'start',
                description: 'Добро пожаловать',
            },
            {
                command: 'date',
                description: 'Указать или изменить даты въезда и выезда',
            },
            {
                command: 'help',
                description: 'Помощь',
            },
        ]);

        /**
         * Event listener for bots commands like /start
         */
        for (let command in commands) {
            bot.onText(commands[command].regex, async (msg) =>
                commands[command].fn(await modifyRequestWithUserData({ msg, bot }))
            );
        }

        /**
         * Text listener, check and call current user event
         */
        bot.on('text', async (msg) => {
            try {
                if (
                    (!msg.entities || msg?.entities[0].type !== 'bot_command') &&
                    eventStorage.isEvent(msg.from.id)
                ) {
                    const event = eventStorage.callEvent(msg.from.id);
                    await event(msg);
                }
            } catch (e) {
                console.error(e);
            }
        });

        /**
         * contact listener
         */
        bot.on('contact', async (msg) => {
            const event = eventStorage.callEvent(msg.from.id);
            await event(msg);
        });

        /**
         * callback listener
         */
        bot.on('callback_query', async (query) => {
            try {
                query.data = JSON.parse(query.data);
                const data = await modifyRequestWithUserData({ msg: query, bot });
                //debug shit
                console.log('===RENT START====>', '\nACTION:', query.data.action, '\nUSER_ID:', data.user.id);
                await inlineCallbacks[query.data.action](data);
                console.log('===RENT END====>');
            } catch (e) {
                console.error(e);
            }
        });

        /**
         * callback listener
         */
        bot.on('callback_query', async (query) => {
            try {
                query.data = JSON.parse(query.data);
                const data = await modifyRequestWithUserData({ msg: query, bot });
                //debug shit
                console.log('===RENT START====>', '\nACTION:', query.data.action, '\nUSER_ID:', data.user.id);
                await inlineCallbacks[query.data.action](data);
                console.log('===RENT END====>');
            } catch (e) {
                console.error(e);
            }
        });

        /**
         * Error handling
         */
        bot.on('polling_error', (msg) => console.log(msg));
    }
    console.log('RENT is ready!');
};
