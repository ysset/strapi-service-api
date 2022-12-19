const getData = async ({ api, field }) =>
    await strapi.entityService.findMany(api, {
        populate: {
            localisation: {
                fields: [field],
            },
            agent: true,
        },
    });

module.exports = {
    async afterCreate() {
        const complexes = await getData({ api: 'api::complex.complex', field: 'city' });
        const villas = await getData({ api: 'api::villa.villa', field: 'city' });
        const owners = await getData({ api: 'api::owner.owner', field: 'city' });

        let agents = await strapi.entityService.findMany('api::agent.agent', {
            filters: { $not: { city: null } },
        });
        const [owner] = await strapi.entityService.findMany('api::agent.agent', {
            filters: { isOwner: true },
            fields: ['id'],
        });
        if (agents.length || owner) {
            for (let object of complexes) {
                const { id } =
                    agents.find((agent) => object.localisation.some((el) => el.city === agent.city)) || {};
                if (id || owner)
                    await strapi.entityService.update('api::complex.complex', object.id, {
                        data: { agent: id || owner.id },
                    });
            }
            for (let object of villas) {
                const { id } =
                    agents.find((el) => object.localisation.some((agent) => el.city === agent.city)) || {};
                if (id || owner)
                    await strapi.entityService.update('api::villa.villa', object.id, {
                        data: { agent: id || owner.id },
                    });
            }
            for (let object of owners) {
                const { id } =
                    agents.find((el) => object.localisation.some((agent) => el.city === agent.city)) || {};
                if (id || owner)
                    await strapi.entityService.update('api::owner.owner', object.id, {
                        data: { agent: id || owner.id },
                    });
            }
        }
    },
};
