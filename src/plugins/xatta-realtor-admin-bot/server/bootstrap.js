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
            description: 'Регистрация агента и выбор городов',
        },
        {
            command: 'delete',
            description: 'Удаление городов',
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

    bot.on('callback_query', async (query) => {
        try {
            query.data = JSON.parse(query.data);
            const data = await modifyRequestWithUserData({ msg: query });
            const event = eventStorage.callEvent(data.user.telegramID);
            await event(data);
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
