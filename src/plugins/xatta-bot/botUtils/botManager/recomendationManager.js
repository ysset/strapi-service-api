const configureFilters = ({ user, userFilters, table }) => {
    const filters = { localisation: { $and: [] } };
    filters.localisation.$and.push({ language: { $eq: user.language } });
    if (userFilters.cities.length) filters.localisation.$and.push({ city: { $in: userFilters.cities } });
    if (userFilters.prices.length)
        filters.localisation.$and.push({
            $and: [
                {
                    cost: {
                        $gte: userFilters.prices[0][0],
                    },
                },
                {
                    cost: {
                        $lt: userFilters.prices[userFilters.prices.length - 1][1],
                    },
                },
            ],
        });
    if (userFilters.layouts.length && table !== 'Villa')
        filters.localisation.$and.push({
            apartments: {
                layout: {
                    $in: userFilters.layouts,
                },
            },
        });
    return filters;
};

module.exports = {
    /**
     * @param user
     * @param api
     * @returns {Promise<null|*>}
     */
    async get({ user, filters: userFilters }) {
        if (!userFilters) userFilters = user.filters;
        const reqData = userFilters.tables.map((table) => ({
            api: `api::${table.toLowerCase()}.${table.toLowerCase()}`,
            table: table,
        }));

        const watched = [...user.watchedComplex, ...user.watchedVilla];
        const favorite = [...user.favoriteComplex, ...user.favoriteVilla];
        // TODO if we have 100,000,000 fields, we will have to do optimization
        const dataArray = reqData.flatMap(async ({ api, table }) => ({
            [table]: await strapi.entityService
                .findMany(api, {
                    filters: configureFilters({ user, userFilters, table }),
                    populate: '*',
                })
                .then((r) =>
                    r.map((el) => {
                        el.table = table;
                        el.api = api;
                        return el;
                    })
                )
                .catch(console.error),
        }));
        let recommendations = await Promise.all(dataArray);
        let filtered = [];

        for (let table of userFilters.tables) {
            recommendations.forEach((rec) => {
                if (rec[table])
                    filtered.push(
                        rec[table]
                            .filter((rec) => !favorite.some((favorite) => rec.id === favorite.id)) //delete all favorites
                            .filter((filtered) => !watched.some((watched) => watched.id === filtered.id)) //delete all watched
                    );
            });
        }

        filtered = filtered.flat();
        await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
            data: { filters: JSON.stringify(userFilters) },
        });
        if (filtered.length === 0) return null;

        return filtered[Math.floor(Math.random() * filtered.length)];
    },

    /**
     * @param where
     * @param apiKey
     * @param table
     * @param flatId
     * @param user
     * @returns {Promise<any>}
     */
    async save({ where, apiKey, data: { table, flatId }, user }) {
        const favoriteObjects = user[`favorite${table}`];

        return await strapi.db
            .query(apiKey)
            .update({
                where,
                data: { [`favorite${table}`]: [...favoriteObjects, flatId] },
                populate: true,
            })
            .catch(console.error);
    },

    /**
     * @param table
     * @param flatId
     * @param user
     * @param where
     * @param apiKey
     * @returns {Promise<any>}
     */
    async remove({ table, flatId, user, where, apiKey }) {
        const flat = await strapi.entityService.findOne(`api::${table}.${table}`, flatId, {
            populate: '*',
        });
        const updateData = flat.favoriteUsers.filter((el) => el.id !== user.id);

        return await strapi.db
            .query(apiKey)
            .update({
                where,
                data: { favoriteUsers: updateData },
                populate: true,
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
