const eventStorage = require('./eventStorage');
const dateStorage = require('./dateStorage');

const createEvent = async ({ telegramID, localisation }) =>
    new Promise((resolve) => {
        const event = async (msg) => {
            const uDate = msg.text.split('-');
            const dates = uDate.map((date = String) => date.trim().split('.').reverse().join('-'));
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

module.exports = async (bot) => {
    const { chatId, localisation } = bot;
    await bot.reply(localisation.DATE);
    await createEvent({
        localisation,
        telegramID: chatId,
    });
};
