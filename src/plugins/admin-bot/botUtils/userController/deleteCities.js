const eventStorage = require('./eventStorage');

const createEventToUpdateAgent = async ({ telegramID, inline_keyboard }) =>
    new Promise((resolve) => {
        const event = async (query) => {
            if (query.data.exit) return resolve(query);

            const { chatId, messageId, user, data } = query;

            user.city = JSON.parse(user.city);
            if (user.city?.length) user.city = user.city.filter((el) => el !== data.city);
            else user.city = [];

            await strapi.entityService.update('api::agent.agent', user.id, {
                data: {
                    city: JSON.stringify(user.city),
                },
            });
            inline_keyboard = inline_keyboard.filter((el) => el[0].text !== data.city);
            await strapi.bots.admin.editMessageReplyMarkup(
                { inline_keyboard },
                {
                    chat_id: chatId,
                    message_id: messageId,
                }
            );
        };
        eventStorage.createEvent({ telegramID, event });
    });

module.exports = async (msg) => {
    const {
        user: { telegramID, id },
        localisation,
    } = msg;

    const agent = await strapi.entityService.findOne('api::agent.agent', id, {
        filters: {
            $not: {
                city: null,
            },
        },
        fields: ['city'],
    });

    const cities = [...new Set(JSON.parse(agent.city))];

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
            text: 'Завершить удаление',
            callback_data: JSON.stringify({ exit: true }),
        },
    ];
    await strapi.bots.admin.sendMessage(telegramID, localisation.GET_CITY, {
        reply_markup: {
            inline_keyboard,
        },
    });
    await createEventToUpdateAgent({
        telegramID,
        dbKey: 'city',
        inline_keyboard,
    });

    await strapi.bots.admin.deleteMessage(msg.chatId, msg.messageId);
    await strapi.bots.admin.sendMessage(msg.chatId, 'Сохранено');
    eventStorage.clearEvents(telegramID);
};
