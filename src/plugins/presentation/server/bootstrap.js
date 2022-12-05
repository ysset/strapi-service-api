'use strict';

const TgBot = require('node-telegram-bot-api');
const { modifyRequestWithUserData, getUser } = require('./utils/user');
const { tokens, languages } = require('../../utils/getBotToken')('PRESENTATION_BOT_TOKEN');
const commands = require('./api/commands');
const commandsInline = require('./api/commandsInline');
const actions = require('../../utils/actions');
const eventStorage = require('./utils/eventStorage');

module.exports = async ({ strapi }) => {
    for (let token of tokens) {
        const bot = await new TgBot(token, { polling: true });
        bot.language = languages[token];
        bot.type = 'presentation';
        bot.actions = actions.presentation;

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
                strapi.log.info(
                    '===START====>' + ' ACTION: ' + query.data.action + ' USER_ID: ' + data.user.id
                );
                await commandsInline[query.data.action](data);
                strapi.log.info('===END====>');
            } catch (e) {
                console.error(e);
            }
        });

        bot.on('message', async (query) => {
            const { user } = await getUser(query);
            if (
                query.web_app_data &&
                typeof commandsInline[actions.presentation.SEARCH_FLATS] === 'function'
            ) {
                return commandsInline[actions.presentation.SEARCH_FLATS](
                    await modifyRequestWithUserData({ msg: query, bot })
                );
            }
            if (user && user.phoneNumber && !user.showPromo) {
                switch (query.text) {
                    case 'Сохраненные ❤️':
                        if (typeof commandsInline[actions.presentation.FAVORITE_HOUSINGS] === 'function')
                            return commandsInline[actions.presentation.FAVORITE_HOUSINGS](
                                await modifyRequestWithUserData({ msg: query, bot })
                            );
                        break;
                    case 'Saved ❤️':
                        if (typeof commandsInline[actions.presentation.FAVORITE_HOUSINGS] === 'function')
                            return commandsInline[actions.presentation.FAVORITE_HOUSINGS](
                                await modifyRequestWithUserData({ msg: query, bot })
                            );
                        break;
                    case 'Хочу на бесплатный обзорный тур 🚀!':
                        if (typeof commandsInline[actions.presentation.INF_TOUR] === 'function')
                            return commandsInline[actions.presentation.INF_TOUR](
                                await modifyRequestWithUserData({ msg: query, bot })
                            );
                        break;
                    case 'I want to take a free tour 🚀!':
                        if (typeof commandsInline[actions.presentation.INF_TOUR] === 'function')
                            return commandsInline[actions.presentation.INF_TOUR](
                                await modifyRequestWithUserData({ msg: query, bot })
                            );
                        break;
                }
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

        /**
         * contact listener
         */
        bot.on('contact', async (msg) => {
            if (eventStorage.isEvent(msg.from.id)) {
                const event = eventStorage.callEvent(msg.from.id);
                await event(msg);
            }
        });

        strapi.log.info(`Registering telegram bot for token: ${token}`);
    }
    strapi.log.warn('Presentation Telegram bot registered successfully');
};
