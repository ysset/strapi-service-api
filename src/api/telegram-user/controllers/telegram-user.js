const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::telegram-user.telegram-user', ({ strapi }) => ({
    async getUser(ctx) {
        const { id } = ctx.request.params;
        if (id) {
            const [user] = await strapi.entityService.findMany('api::telegram-user.telegram-user', {
                filters: {
                    telegramId: id,
                },
            });
            if (!user || user.length === 0) return { ok: false };
            return { id: user.id, ok: true };
        }
        return { ok: false };
    },

    async createUser(ctx) {
        const { telegramId, firstName, lastName, username, language, isBot } = ctx.request.body;
        console.log(ctx.request.body);
        const user = await strapi.entityService.create('api::telegram-user.telegram-user', {
            data: {
                telegramId,
                firstName,
                lastName,
                username,
                language,
                isBot,
            },
        });
        if (user.id) return { ok: true };

        return { ok: false };
    },
}));
