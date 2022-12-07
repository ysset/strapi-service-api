const getFilters = ({ userFilters, table }) => ({
    localisation: {
        $and: [
            { language: userFilters.language },
            userFilters.cities.length ? { city: { $in: userFilters.cities } } : {},
            {
                cost: {
                    $gte: userFilters.prices[0],
                    $lte: userFilters.prices[1],
                },
            },
            userFilters.layouts.length
                ? table === 'Owner'
                    ? { layout: userFilters.layouts }
                    : { apartments: { layout: userFilters.layouts } }
                : {},
        ],
    },
});

module.exports = {
    async get({ user, filters: userFilters, local }) {
        let filtered = [];
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
        if (!userFilters)
            userFilters = {
                ...user?.filters?.last,
                language: local,
            };
        if (!userFilters) return null;
        let watched = {
            Complex: user.watchedComplex || [],
            Villa: user.watchedVilla || [],
            Owner: user.watchedOwner || [],
        };
        const favorites = {
            Complex: user.favoriteComplex,
            Villa: user.favoriteVilla,
            Owner: user.favoriteOwner,
        };
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
        const dataArray = reqData.flatMap(async ({ api, table }) => {
            return {
                [table]: await strapi.entityService
                    .findMany(api, {
                        filters: getFilters({ userFilters, table }),
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
                        sort: {
                            id: 'asc',
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
            };
        });
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

        let table = filtered.Owner?.length ? 'Owner' : filtered.Complex?.length ? 'Complex' : 'Villa';

        if (!table) return null;
        if (!filtered[table]) return null;
        let object = filtered[table].filter(
            (el) => !watched[table].some((watched) => el.id === watched.id)
        )[0];
        if (!object || filtered[table].length === watched[table].length) {
            strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
                data: { [`watched${table}`]: [] },
                populate: {
                    [`watched${table}`]: true,
                },
            });
            watched[table] = [];
            object = filtered[table][0];
        }
        if (!object) return null;
        await strapi.entityService.update('api::telegram-user.telegram-user', user.id, {
            data: { [`watched${table}`]: [...watched[table], object.id] },
        });
        return object;
    },

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
