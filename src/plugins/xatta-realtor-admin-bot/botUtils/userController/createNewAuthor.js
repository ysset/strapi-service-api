const { getUser } = require('./index');
const eventStorage = require('./eventStorage');

/**
 * @param telegramID
 * @param id
 * @param dbKey
 * @param regex
 * @param localisation
 * @returns {Promise<unknown>}
 */
const createEventToUpdateAgent = async ({ telegramID, agentID: id, dbKey, regex, localisation }) =>
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
                await strapi.bots.admin.sendMessage(telegramID, localisation.INPUT_ERROR[dbKey]);
            }
        };
        eventStorage.createEvent({ telegramID, event });
    });

/**
 * @param msg
 * @returns {Promise<void>}
 */
module.exports = async (msg) => {
    const {
        user: { ownerName, telegramID, botToken, agencyName, email, id, admin },
        localisation,
        chatId,
    } = msg;

    /**
     * Get username and save
     */
    if (!ownerName) {
        await strapi.bots.admin.sendMessage(telegramID, localisation.GET_USERNAME);
        await createEventToUpdateAgent({
            localisation,
            telegramID,
            agentID: id,
            dbKey: 'ownerName',
            regex: /[А-Яа-я\w]/,
        });
        eventStorage.clearEvents(telegramID);
    }

    /**
     * Get user email and save
     */
    if (!email) {
        await strapi.bots.admin.sendMessage(telegramID, localisation.GET_USER_EMAIL);
        await createEventToUpdateAgent({
            localisation,
            telegramID,
            agentID: id,
            dbKey: 'email',
            regex: /^[a-zA-Z\d]+(?:\.[a-zA-Z\d]+)*@[a-zA-Z]+\.?(?:\.[a-zA-Z\d]+)+$/,
        });
        eventStorage.clearEvents(telegramID);
    }

    /**
     * Get user agency name and save
     */
    if (!agencyName) {
        await strapi.bots.admin.sendMessage(telegramID, localisation.GET_AGENCY_NAME);
        await createEventToUpdateAgent({
            localisation,
            telegramID,
            agentID: id,
            dbKey: 'agencyName',
            regex: /[А-Яа-я\w]/,
        });
        eventStorage.clearEvents(telegramID);
    }

    if (!botToken) {
        await strapi.bots.admin.sendMessage(telegramID, localisation.GET_BOT_TOKEN);
        await createEventToUpdateAgent({
            localisation,
            telegramID,
            agentID: id,
            dbKey: 'botToken',
            regex: /^\d{10}:[\w\W]{35}$/,
        });
        eventStorage.clearEvents(telegramID);
    }

    /**
     * Create new author in admin panel
     */
    if (!admin) {
        //actualise current user
        const { user } = await getUser(msg);
        //create author
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
        //complete registration if admin is created
        if (admin) {
            await strapi.bots.admin.sendMessage(
                telegramID,
                localisation.COMPLETE_ADMIN_REGISTRATION(admin.registrationToken)
            );
        }
    }
    return strapi.bots.admin.sendMessage(chatId, 'Вы успешно зарегистрированы!');
};
