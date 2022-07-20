const getUser = require('./index');
const eventStorage = require('./eventStorage');
module.exports = async (msg) => {
    const { ownerName, telegramID } = await getUser({ msg });

    if (!ownerName) {
        await strapi.bots.admin.sendMessage(telegramID, 'Please submit a name that will be visible to users');
        await new Promise((resolve) => {
            const event = async (msg) => {
                const user = await getUser({ msg });
                console.log(user);
                await strapi.entityService.update('api::agent.agent', user.id, {
                    data: {
                        ownerName: msg.text,
                    },
                });
                resolve();
            };
            eventStorage.createEvent({ telegramID, event });
        });
    }
};
