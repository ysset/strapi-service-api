module.exports = {
    async get({ user, filter }) {
        const watched = {
            cars: user.checked_cars,
            flats: user.checked_flats,
        };
        const favorite = {
            cars: user.favorite_cars,
            flats: user.favorite_flats,
        };
        if (!favorite[filter.type.toLowerCase()]) {
            return null;
        }
        if (!watched[filter.type.toLowerCase()]) {
            return null;
        }
        const recommendations = await strapi.entityService.findMany(filter.api, {
            populate: '*',
        });
        // убираем из полного списка все что было сохранено пользователем
        let filteredByFavorite = recommendations.filter((rec) => {
            return !favorite[filter.type.toLowerCase()].some((favorite) => rec.id === favorite.id);
        });
        // убираем из полного списка все что было просмотрено пользователем
        let filteredByWatched = filteredByFavorite.filter((filtered) => {
            return !watched[filter.type.toLowerCase()].some((watched) => watched.id === filtered.id);
        });
        if (filteredByWatched.length === 0) {
            return null;
        }
        return filteredByWatched[Math.floor(Math.random() * filteredByWatched.length)];
    },

    /**
     *
     * @param filter
     * @param data
     * @param user
     * @returns {Promise<void>}
     */
    async save({ filter, data, user }) {
        const {
            where: { key, value },
            apiKey,
        } = filter;

        const updateDataKey = `favorite_${data.type.toLowerCase()}`;
        const updateData = [...user[`favorite_${data.type.toLowerCase()}`], data.recId];

        await strapi.db
            .query(apiKey)
            .update({
                where: {
                    [key]: value,
                },
                data: { [updateDataKey]: updateData },
                populate: true,
            })
            .catch((e) => {
                console.log(e);
            });
    },

    async remove({ filter, data, user }) {
        const {
            where: { key, value },
            apiKey,
        } = filter;

        const updateDataKey = `favorite_${data.type.toLowerCase()}`;
        const updateData = [...user[`favorite_${data.type.toLowerCase()}`].filter((el) => el !== data.recId)];

        await strapi.db
            .query(apiKey)
            .update({
                where: {
                    [key]: value,
                },
                data: { [updateDataKey]: updateData },
                populate: true,
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
