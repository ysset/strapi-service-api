module.exports = {
    async afterCreate(event) {
        const { result } = event;
        if (result.agent) return event;

        const city = result.localisation[0].city;
        const [agent] = await strapi.entityService.findMany('api::agent.agent', {
            filters: { city },
            fields: ['id'],
        });
        const [randAgent] = await strapi.entityService.findMany('api::agent.agent');
        if (agent)
            await strapi.entityService.update('api::complex.complex', result.id, {
                data: { agent: agent.id },
            });
        else
            await strapi.entityService.update('api::complex.complex', result.id, {
                data: { agent: randAgent.id || 1 },
            });

        return event;
    },
};
