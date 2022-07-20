const getUser = require('./index');
const eventStorage = require('./eventStorage');

module.exports = async (msg) => {
    const { ownerName, telegramID, email, id, admin } = await getUser({ msg });

    if (!ownerName) {
        await strapi.bots.admin.sendMessage(telegramID, 'Please submit a name that will be visible to users');
        await new Promise((resolve) => {
            const event = async (msg) => {
                await strapi.entityService.update('api::agent.agent', id, {
                    data: {
                        ownerName: msg.text,
                    },
                });
                resolve();
            };
            eventStorage.createEvent({ telegramID, event });
        });
    }

    if (!email) {
        await strapi.bots.admin.sendMessage(telegramID, 'Please enter your email');
        await new Promise((resolve) => {
            const event = async (msg) => {
                await strapi.entityService.update('api::agent.agent', id, {
                    data: {
                        email: msg.text,
                    },
                });
                resolve();
            };
            eventStorage.createEvent({ telegramID, event });
        });
    }

    if (!admin) {
        const user = await getUser({ msg });
        const admin = await strapi.admin.services.user.create({
            firstname: user.ownerName,
            username: user.username,
            email: user.email,
            roles: [3],
            password: '0147369852WASd',
            isActive: true,
        });
        await strapi.entityService.update('api::agent.agent', id, {
            data: {
                createdBy: admin.id,
            },
        });
        console.log(admin);
    }
};
