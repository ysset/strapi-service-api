module.exports = {
    async afterCreate(event) {
        const { result } = event;
        if (result.agent) return event;
        const cityEn = result.localisation.find((el) => el.language === 'en')?.city;
        const cityRu = result.localisation.find((el) => el.language === 'ru')?.city;

        if (cityEn || cityRu) {
            const [agent] = await strapi.entityService.findMany('api::agent.agent', {
                filters:
                    cityRu && cityEn
                        ? { $or: [{ city: cityEn }, { city: cityRu }] }
                        : { city: cityRu || cityEn },
                fields: ['id'],
            });
            const [owner] = await strapi.entityService.findMany('api::agent.agent', {
                filters: { isOwner: true },
                fields: ['id'],
            });
            if (agent || owner) {
                await strapi.entityService.update('api::object.object', result.id, {
                    data: { agent: agent?.id || owner.id },
                });
            }
        }

        return event;
    },
};
