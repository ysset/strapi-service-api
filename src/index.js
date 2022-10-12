'use strict';
const isEnv = () => {
    const env = process.env;
    return !(!env.BOT_API_KEY || !env.WEB_APP_URL || !env.XATTA_ADMIN_BOT_API_KEY || !env.AGENCY_NAME);
};
const getData = async ({ api, field }) =>
    await strapi.entityService.findMany(api, {
        filters: {
            localisation: {
                language: 'ru',
            },
        },
        populate: {
            localisation: {
                fields: [field],
            },
            agent: true,
        },
    });

// Create custom Promise method
const rejectSleep = (time, customReject) =>
    new Promise((_, reject) =>
        setTimeout(() => (customReject ? customReject() : reject('Time is over')), time)
    );
Promise.timeout = (promise = Promise, time, customReject) =>
    Promise.race([promise, rejectSleep(time, customReject)]);

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

        const complexes = await getData({ api: 'api::complex.complex', field: 'city' });
        const villas = await getData({ api: 'api::villa.villa', field: 'city' });
        const owners = await getData({ api: 'api::owner.owner', field: 'city' });

        let agents = await strapi.entityService.findMany('api::agent.agent', {
            filters: { $not: { city: null } },
        });
        for (let object of complexes) {
            const agent = agents.find((agent) => {
                const city = JSON.parse(agent.city);
                return city.some((city) => city === object.localisation[0].city);
            });
            await strapi.entityService.update('api::complex.complex', object.id, {
                data: { agent: agent?.id || 1 },
            });
        }
        for (let object of villas) {
            const agent = agents.find((agent) => {
                const city = JSON.parse(agent.city);
                return city.some((city) => city === object.localisation[0].city);
            });
            await strapi.entityService.update('api::villa.villa', object.id, {
                data: { agent: agent?.id || 1 },
            });
        }
        for (let object of owners) {
            const agent = agents.find((agent) => {
                const city = JSON.parse(agent.city);
                return city.some((city) => city === object.localisation[0].city);
            });
            await strapi.entityService.update('api::owner.owner', object.id, {
                data: { agent: agent?.id || 1 },
            });
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
