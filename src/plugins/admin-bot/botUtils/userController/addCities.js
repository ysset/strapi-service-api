const eventStorage = require('./eventStorage');
/**
 * @param api
 * @param field
 * @param language
 * @returns {Promise<*>}
 */
const getData = async ({ api, field, language }) => {
    let res = await strapi.entityService.findMany(api, {
        filters: {
            localisation: {
                language,
            },
        },
        populate: {
            localisation: {
                fields: ['language', field],
            },
            agent: true,
        },
    });
    res = res.filter((el) => el.agent);
    return res.map((el) => el.localisation.find((el) => el.language === language)[field]);
};

const createEventToUpdateAgent = async ({ telegramID, inline_keyboard, bot }) =>
    new Promise((resolve) => {
        const event = async (query) => {
            if (query.data.exit) return resolve(query);

            const { chatId, messageId, user, data } = query;

            user.city = JSON.parse(user.city);
            if (user.city?.length) user.city.push(data.city);
            else user.city = [data.city];

            await strapi.entityService.update('api::agent.agent', user.id, {
                data: {
                    city: JSON.stringify(user.city),
                },
            });
            inline_keyboard = inline_keyboard.filter((el) => el[0].text !== data.city);
            await bot.editMessageReplyMarkup(
                { inline_keyboard },
                {
                    chat_id: chatId,
                    message_id: messageId,
                }
            );
        };
        eventStorage.createEvent({ telegramID, event });
    });

module.exports = async (bot) => {
    const {
        user: { telegramID },
        localisation,
        messageId,
    } = bot;

    const complexCities = await getData({ api: 'api::complex.complex', field: 'city', language: 'ru' });
    const villaCities = await getData({ api: 'api::villa.villa', field: 'city', language: 'ru' });
    const ownerCities = await getData({
        api: 'api::owner.owner',
        field: 'city',
        language: 'ru',
    });

    const agents = await strapi.entityService.findMany('api::agent.agent', {
        filters: {
            $not: {
                city: null,
            },
        },
        fields: ['city'],
    });

    const agentCities = agents.map((el) => JSON.parse(el.city)).flat(1);

    const cities = [
        ...new Set([
            ...complexCities.map((el) => el.trim()),
            ...villaCities.map((el) => el.trim()),
            ...ownerCities.map((el) => el.trim()),
        ]),
    ]
        .flat(1)
        .filter((city) => !agentCities.some((el) => el === city));
    const inline_keyboard = cities.map((city) => {
        return [
            {
                text: city,
                callback_data: JSON.stringify({ city }),
            },
        ];
    });
    inline_keyboard[inline_keyboard.length] = [
        {
            text: 'Завершить выбор',
            callback_data: JSON.stringify({ exit: true }),
        },
    ];
    await bot.sendMessage(telegramID, localisation.GET_CITY, {
        reply_markup: {
            inline_keyboard,
        },
    });
    await createEventToUpdateAgent({
        telegramID,
        dbKey: 'city',
        inline_keyboard,
        bot,
    });

    await bot.deleteMessage(telegramID, messageId);
    await bot.sendMessage(telegramID, 'Вы успешно авторизованы');
    eventStorage.clearEvents(telegramID);
};
