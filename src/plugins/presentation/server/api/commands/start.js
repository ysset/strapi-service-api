const start = async (bot) => {
    const { localisation } = bot;
    await bot.reply(localisation.start, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        ...localisation.startButtonInline,
                        callback_data: JSON.stringify({ action: bot.actions.START }),
                    },
                ],
            ],
        },
    });
};

module.exports = {
    regex: /\/start/,
    fn: start,
};
