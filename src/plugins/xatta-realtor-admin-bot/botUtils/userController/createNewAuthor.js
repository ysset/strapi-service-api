const getUser = require('./index');
const eventStorage = require('./eventStorage');

const updateAgent = async ({ telegramID, agentID: id, dbKey, regex }) =>
    new Promise((resolve) => {
        const event = async (msg) => {
            if (msg.text.match(regex)) {
                await strapi.entityService.update('api::agent.agent', id, {
                    data: {
                        [dbKey]: msg.text,
                    },
                });
                resolve();
            } else {
                await strapi.bots.admin.sendMessage(telegramID, `Wrong ${dbKey}`);
            }
        };
        eventStorage.createEvent({ telegramID, event });
    });

module.exports = async (msg) => {
    const { ownerName, telegramID, email, id, admin } = await getUser({ msg });

    if (!ownerName) {
        await strapi.bots.admin.sendMessage(telegramID, 'Please submit a name that will be visible to users');
        await updateAgent({
            telegramID,
            agentID: id,
            dbKey: 'ownerName',
            regex: /[А-Яа-я\w]/,
        }).then(() => eventStorage.clearEvents(telegramID));
    }

    if (!email) {
        await strapi.bots.admin.sendMessage(telegramID, 'Please enter your email');
        await updateAgent({
            telegramID,
            agentID: id,
            dbKey: 'email',
            regex: /^[a-zA-Z\d]+(?:\.[a-zA-Z\d]+)*@[a-zA-Z]+\.?(?:\.[a-zA-Z\d]+)+$/,
        }).then(() => eventStorage.clearEvents(telegramID));
    }

    if (!admin) {
        const user = await getUser({ msg });
        const admin = await strapi.admin.services.user.create({
            firstname: user.ownerName,
            username: user.username,
            email: user.email,
            roles: [3],
        });
        await strapi.entityService.update('api::agent.agent', id, {
            data: {
                createdBy: admin.id,
                admin: admin.id,
            },
        });
        if (admin) {
            await strapi.bots.admin.sendMessage(
                telegramID,
                `Welcome to xatta, now you have access to admin panel.\nhttp://xatta.ru//admin/auth/register?registrationToken=${admin.registrationToken}`
            );
        }
    }
};
