const actions = require('../actions');
const getUserInfo = require('../../../../../utils/event/getUserInfo');
const { getUser } = require('../../../../../utils');

module.exports = async (bot) => {
    const {
        user: { phoneNumber },
        localisation,
    } = bot;

    if (!process.env.DEVELOPMENT && !phoneNumber) {
        await getUserInfo(bot);
    }
    const { user, chatId } = await getUser(bot.msg);

    const { telegramID: agentTelegramId } = await strapi.entityService.findOne('api::agent.agent', 1);
    const userMessage = localisation.INF_TOUR;
    const realtorMessage = localisation.INF_TOUR_REALTOR({
        username: user.username,
        phoneNumber: user.phoneNumber,
    });
    const log = await strapi.entityService.create('api::log.log', {
        data: {
            user: user.id,
            infoTour: true,
        },
    });

    const { message_id } = await strapi.bots.admin
        .sendMessage(agentTelegramId, realtorMessage, { parse_mode: 'HTML' })
        .catch(console.error);

    await bot
        .sendMessage(chatId, userMessage, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            ...localisation?.CANCEL_INFO_TOUR_INLINE,
                            callback_data: JSON.stringify({
                                action: actions.CANCEL_INFO_TOUR_INLINE,
                                log: log.id,
                                msgId: message_id,
                            }),
                        },
                    ],
                ],
            },
        })
        .catch(console.error);
};
