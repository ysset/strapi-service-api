const eventStorage = require('./eventStorage');
const dateStorage = require('./dateStorage');

const createEvent = async ({ telegramID, localisation }) =>
    new Promise((resolve) => {
        const event = async (msg) => {
            const uDate = msg.text.split('-');
            let dates = uDate.map((date = String) => date.trim().split('.'));
            dates = dates.map((date) => {
                const day = date[0];
                const month = date[1];
                const year = date[2];
                return new Date([month, day, year].join('.'));
            });
            if (new Date(uDate[0]) && new Date(uDate[1]) && dates[0] < dates[1]) {
                dateStorage.createDateFilter({ telegramID, date: dates });
                eventStorage.clearEvents(telegramID);
                resolve();
            } else {
                await strapi.bots.rent.sendMessage(telegramID, localisation.INPUT_ERROR.date);
            }
        };
        eventStorage.createEvent({ telegramID, event });
    });

module.exports = async (msg) => {
    const { chatId, localisation } = msg;
    await strapi.bots.rent.sendMessage(chatId, localisation.DATE);
    await createEvent({
        localisation,
        telegramID: chatId,
    });
};
