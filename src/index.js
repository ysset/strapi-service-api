'use strict';
const isEnv = () => {
    const env = process.env;
    return !(
        !env.REALTOR_BOT_API_KEY ||
        !env.RENT_BOT_API_KEY ||
        !env.RENT_WEB_APP_URL ||
        !env.REALTOR_WEB_APP_URL ||
        !env.ADMIN_BOT_API_KEY ||
        !env.AGENCY_NAME
    );
};
const getData = async ({ api, field }) =>
    await strapi.entityService.findMany(api, {
        filters: {
            agent: null,
        },
        populate: {
            localisation: {
                fields: [field],
            },
            agent: true,
        },
    });

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
                    'REALTOR_BOT_API_KEY\n' +
                    'RENT_BOT_API_KEY\n' +
                    'WEB_APP_URL\n' +
                    'ADMIN_BOT_API_KEY\n' +
                    'AGENCY_NAME'
            );
        }

        const complexes = await getData({ api: 'api::complex.complex', field: 'city', language: 'ru' });
        const villas = await getData({ api: 'api::villa.villa', field: 'city', language: 'ru' });
        const owners = await getData({ api: 'api::owner.owner', field: 'agent', language: 'ru' });

        let agents = await strapi.entityService.findMany('api::agent.agent', {
            filters: { $not: { city: null } },
        });
        for (let object of complexes) {
            const agent = agents.find((agent) => {
                const city = JSON.parse(agent.city);
                city.some((city) => city === object.localisation[0].city);
            });
            await strapi.entityService.update('api::complex.complex', object.id, {
                data: { agent: agent?.id || 1 },
            });
        }
        for (let object of villas) {
            const agent = agents.find((agent) => {
                const city = JSON.parse(agent.city);
                city.some((city) => city === object.localisation[0].city);
            });
            await strapi.entityService.update('api::villa.villa', object.id, {
                data: { agent: agent?.id || 1 },
            });
        }
        for (let object of owners) {
            const agent = agents.find((agent) => {
                const city = JSON.parse(agent.city);
                city.some((city) => city === object.localisation[0].city);
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
