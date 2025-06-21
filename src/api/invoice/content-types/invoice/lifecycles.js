const date = require('date-and-time');

module.exports = {
    async afterCreate(event) {
        const { result, params } = event;
        const subscriptions = [];
        console.log(result, params);
        const now = new Date();
        const subs = await strapi.entityService.findMany('api::types-of-subscription.types-of-subscription');
        let subType = subs.find((e) => e.price === Number.parseInt(result.invoicePayload));
        const { subscriptions: uSubs } = await strapi.entityService.findOne(
            'api::telegram-user.telegram-user',
            params.data.telegramUser, {
                populate: {
                    subscriptions: true
                }
            }
        );
        if (uSubs && uSubs.length > 0) {
            subscriptions.push(...uSubs)
            const lustSub = uSubs.reduce(
                (largest, current) => (new Date(current.end) > new Date(largest.end) ? current : largest));
            const subEnd = new Date(lustSub.end)
            if (now < subEnd) {
                // метод getMonth начинает отсчет с 0
                const lSubMonth = subEnd.getMonth() + 1
                const lSubYear = subEnd.getFullYear()
                const currDay = now.getDate();
                const next_month = date.addMonths(new Date(`${lSubYear}-${lSubMonth}-${currDay}`), 1);
                subscriptions.push({
                    types_of_subscription: subType.id,
                    price: result.invoicePayload,
                    start: now,
                    end: next_month,
                });
            } else {
                const next_month = date.addMonths(now, 1);
                subscriptions.push({
                    types_of_subscription: subType.id,
                    price: result.invoicePayload,
                    start: now,
                    end: next_month,
                });
            }
        } else {
            const next_month = date.addMonths(now, 1);
            subscriptions.push({
                types_of_subscription: subType.id,
                price: result.invoicePayload,
                start: now,
                end: next_month,
            });
        }

        await strapi.entityService
            .update('api::telegram-user.telegram-user', params.data.telegramUser, {
                data: {
                    subscriptions,
                },
            })
            .catch((error) => console.log(JSON.stringify(error)));
    },
};
