'use strict';
//connection lost fix
process.env.NTBA_FIX_319 = 1;

// Connect to bot API
const TgBot = require('node-telegram-bot-api');
const bot = new TgBot(process.env.RENT_BOT_API_KEY, { polling: true });

const commands = require('./commands');
const { modifyRequestWithUserData } = require('./utils');
const { eventStorage } = require('./utils');

/**
 * @param strapi
 */
module.exports = async ({ strapi }) => {
    strapi.bots.rent = bot;
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
        strapi.bots.rent.onText(commands[command].regex, async (msg) =>
            commands[command].fn(await modifyRequestWithUserData({ msg }))
        );
    }

    /**
     * Text listener, check and call current user event
     */
    strapi.bots.rent.on('text', async (msg) => {
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
     * Error handling
     */
    strapi.bots.rent.on('polling_error', (msg) => console.log(msg));

    console.log('RENT is ready!');
};
