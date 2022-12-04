module.exports = async (bot) => {
    const { data } = bot;
    await strapi.entityService.update('api::log.log', {
        filters: { id: data.log },
        data: { canceled: true },
    });
};
