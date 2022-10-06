module.exports = {
    async afterCreate(event) {
        const { result } = event;
        if (result.agent) return event;
        const city = result.localisation[0].city;

        const [agent] = await strapi.entityService.findMany('api::agent.agent', {
            filters: { city },
            fields: ['id'],
        });

        let [randAgent] = await strapi.entityService.findMany('api::agent.agent', {
            filters: { $not: { city: null } },
        });

        await strapi.entityService.update('api::complex.complex', result.id, {
            data: { agent: agent?.id || randAgent.id || 1 },
        });

        return event;
    },
};
