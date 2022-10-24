const configureFilters = ({ userFilters, table }) => {
    // language
    const filters = { localisation: { $and: [{ language: 'ru' }] } };
    // housing type
    if (userFilters.housings && userFilters.housings.length)
        filters.localisation.$and.push({ type: { $in: userFilters.housings } });
    // cities
    if (userFilters.cities.length) filters.localisation.$and.push({ city: { $in: userFilters.cities } });
    //price
    if (userFilters.prices.length)
        filters.localisation.$and.push({
            cost: {
                $gte: userFilters.prices[0],
                $lte: userFilters.prices[1],
            },
        });
    // layout
    if (userFilters.layouts.length && table !== 'Villa' && table !== 'Owner')
        filters.localisation.$and.push({
            apartments: {
                layout: {
                    $in: userFilters.layouts,
                },
            },
        });
    if (userFilters.layouts.length && table === 'Owner')
        filters.localisation.$and.push({
            layout: {
                $in: userFilters.layouts,
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
        let filtered = {};
        if (userFilters?.layouts)
            userFilters.layouts = userFilters?.layouts
                .filter((el) => el.match(/^ \d\+\d$/))
                .map((el) => [
                    `${el}`,
                    `${el} Duplex`,
                    `${el} Garden Duplex`,
                    `${el} Penthouse`,
                    ` ${el[1]}.5+${el[3]}`,
                    ` ${el[1]}.5+${el[3]} Duplex`,
                    ` ${el[1]}.5+${el[3]} Garden Duplex`,
                    ` ${el[1]}.5+${el[3]} Penthouse`,
                ])
                .flat(1);

        if (!userFilters) userFilters = user.filters.last;

        const watched = { Complex: user.watchedComplex, Villa: user.watchedVilla, Owner: user.watchedOwner };
        const favorites = {
            Complex: user.favoriteComplex,
            Villa: user.favoriteVilla,
            Owner: user.favoriteOwner,
        };

        if (!userFilters) return;

        const reqData = userFilters.tables.map((table) => ({
            api: `api::${table.toLowerCase()}.${table.toLowerCase()}`,
            table,
        }));

        const dbFilters = await strapi.entityService.findOne('api::telegram-user.telegram-user', user.id, {
            fields: ['filters'],
        });

        strapi.entityService
            .update('api::telegram-user.telegram-user', user.id, {
                data: {
                    filters: JSON.stringify({
                        ...dbFilters.filters,
                        [userFilters.type]: userFilters,
                        last: userFilters,
                    }),
                },
            })
            .catch(console.error);

        // TODO if we have 100,000,000 fields, we will have to do optimization
        const dataArray = reqData.flatMap(async ({ api, table }) => ({
            [table]: await strapi.entityService
                .findMany(api, {
                    filters: configureFilters({ user, userFilters, table }),
                    populate: {
                        localisation: {
                            populate: {
                                apartments: true,
                                infrastructure: true,
                                apartmentEquipment: true,
                                floors: true,
                            },
                        },
                        layoutPhoto: true,
                        agent: true,
                    },
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

        for (let table of userFilters.tables) {
            recommendations.forEach((rec) => {
                if (rec[table]) {
                    rec[table] = rec[table].map((el) => {
                        if (favorites[table].some((favorite) => favorite.id === el.id)) el.favorite = true;
                        return el;
                    });
                    filtered[table] = rec[table];
                }
            });
        }

        const table = userFilters.tables[Math.floor(Math.random() * userFilters.tables.length)];

        if (filtered[table].length === watched[table].length)
            await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
                data: {
                    [`watched${table}`]: [],
                },
            });

        return filtered[table].length !== watched[table].length
            ? filtered[table][watched[table].length]
            : filtered[table][0];
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
        const favoriteObjects = user[`favorite${table}`] ? user[`favorite${table}`] : [];

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
        const flat = await strapi.entityService.findOne(`api::${table}.${table}`, flatId, { populate: '*' });
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
