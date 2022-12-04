// const actions = require('../actions');

module.exports = async (bot) => {
    const {
        user: { telegramID: userTelegramId, username, id },
        localisation,
    } = bot;
    const { telegramID: agentTelegramId } = await strapi.entityService.findOne('api::agent.agent', 1);
    const userMessage = localisation.INF_TOUR;
    const realtorMessage = localisation.INF_TOUR_REALTOR({ username });
    // const log = await strapi.entityService.create('api::log.log', {
    //     data: {
    //         user: id,
    //         infoTour: true,
    //     },
    // });

    await bot
        .sendMessage(userTelegramId, userMessage, {
            parse_mode: 'HTML',
            // reply_markup: {
            //     inline_keyboard: [
            //         [
            //             {
            //                 ...localisation?.CANCEL_INFO_TOUR_INLINE,
            //                 callback_data: JSON.stringify({
            //                     action: actions.CANCEL_INFO_TOUR_INLINE,
            //                     log: log.id,
            //                 }),
            //             },
            //         ],
            //     ],
            // },
        })
        .catch(console.error);

    await strapi.bots.admin
        .sendMessage(agentTelegramId, realtorMessage, { parse_mode: 'HTML' })
        .catch(console.error);
};
