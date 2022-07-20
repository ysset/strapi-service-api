module.exports = async ({ msg }) => {
    const user = await strapi.db.query('api::agent.agent').findOne({
        where: {
            telegramID: msg.from.id,
        },
        populate: true,
    });

    if (!user)
        await strapi.entityService.create('api::agent.agent', {
            data: {
                telegramID: msg.from.id,
                language: msg.from.language_code,
                username: msg.from.username,
            },
        });

    return user;
};
