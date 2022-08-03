module.exports = {
    /**
     * @param user
     * @param filter
     * @returns {Promise<null|array>}
     */
    async get({ user, filter }) {
        const watched = user.watchedHousings;
        const favorite = user.favoriteHousings;

        if (!favorite || !watched) {
            return null;
        }

        // TODO if we have 100,000,000 fields, we will have to do optimization
        const recommendations = await strapi.entityService.findMany(filter.api, {
            filters: {
                housingType: filter.housingType,
            },
            populate: '*',
        });

        let filtered = recommendations
            .filter((rec) => !favorite.some((favorite) => rec.id === favorite.id)) //delete all favorites
            .filter((filtered) => !watched.some((watched) => watched.id === filtered.id)); //delete all watched

        if (filtered.length === 0) {
            return null;
        }

        return filtered[Math.floor(Math.random() * filtered.length)];
    },

    /**
     * @param filter
     * @param data
     * @param user
     * @returns {Promise<*>}
     */
    async save({ filter, data, user }) {
        const { where, apiKey } = filter;
        return await strapi.db
            .query(apiKey)
            .update({
                where,
                data: { favoriteHousings: [...user.favoriteHousings, data.flatId] },
                populate: true,
            })
            .catch((e) => {
                console.log(e);
            });
    },

    /**
     * @param filter
     * @param data
     * @param user
     * @returns {Promise<*>}
     */
    async remove({ filter, data, user }) {
        const { where, apiKey } = filter;
        const updateData = user.favoriteHousings.filter((el) => el.id !== data.flatId);

        return await strapi.db
            .query(apiKey)
            .update({
                where,
                data: { favoriteHousings: updateData },
                populate: true,
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
