'use strict';
const isEnv = () => {
    const env = process.env;
    return !(!env.BOT_API_KEY || !env.WEB_APP_URL || !env.XATTA_ADMIN_BOT_API_KEY || !env.AGENCY_NAME);
};
module.exports = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register({ strapi }) {
        strapi.bots = {};
    },

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
        if (!isEnv()) {
            throw new Error(
                'Please check env for values\n' +
                    'BOT_API_KEY\n' +
                    'WEB_APP_URL\n' +
                    'XATTA_ADMIN_BOT_API_KEY\n' +
                    'AGENCY_NAME'
            );
        }
        const ids = await strapi.entityService.findMany('api::telegram-user.telegram-user', {
            fields: ['id'],
        });
        for (let { id } of ids) {
            await strapi.entityService.update('api::telegram-user.telegram-user', id, {
                data: {
                    filters: {},
                },
            });
        }
    },
};
