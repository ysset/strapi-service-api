'use strict';
//connection lost fix
process.env.NTBA_FIX_319 = 1;

// Connect to bot API
const TgBot = require('node-telegram-bot-api');
const bot = new TgBot(process.env.XATTA_ADMIN_BOT_API_KEY, { polling: true });

const { commands } = require('./bot/components');
const { modifyRequestWithUserData } = require('../botUtils/userController');
const eventStorage = require('../botUtils/userController/eventStorage');

/**
 * @param strapi
 */
module.exports = async ({ strapi }) => {
    strapi.bots.admin = bot;
    await bot.setMyCommands([
        {
            command: 'start',
            description: 'Добро пожаловать',
        },
        {
            command: 'registration',
            description: 'Регистрация агентства',
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
        strapi.bots.admin.onText(commands[command].regex, async (msg) =>
            commands[command].fn(await modifyRequestWithUserData({ msg }))
        );
    }

    /**
     * Text listener, check and call current user event
     */
    strapi.bots.admin.on('text', async (msg) => {
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
    strapi.bots.admin.on('polling_error', (msg) => console.log(msg));

    console.log('Xatta admin is ready!');
};
