'use strict';
//connection lost fix
process.env.NTBA_FIX_319 = 1;

const TgBot = require('node-telegram-bot-api');
const { tokens, languages } = require('../../utils/getBotToken')('ADMIN_BOT_TOKEN');

const { commands } = require('./bot/components');
const { modifyRequestWithUserData } = require('../botUtils/userController');
const eventStorage = require('../botUtils/userController/eventStorage');

module.exports = async () => {
    for (let token of tokens) {
        let bot = await new TgBot(token, { polling: true });
        bot.language = languages[token];
        bot.type = 'admin';

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

        for (let command in commands) {
            bot.onText(commands[command].regex, async (msg) =>
                commands[command].fn(await modifyRequestWithUserData({ msg, bot }))
            );
        }

        bot.on('callback_query', async (query) => {
            try {
                query.data = JSON.parse(query.data);
                const data = await modifyRequestWithUserData({ msg: query, bot });
                const event = eventStorage.callEvent(data.user.telegramID);
                await event(data);
            } catch (e) {
                console.error(e);
            }
        });

        bot.on('polling_error', (msg) => console.log(msg));
    }
    console.log('ADMIN is ready!');
};
