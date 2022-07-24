module.exports = {
    /**
     * @param user
     * @param filter
     * @returns {Promise<null|array>}
     */
    async get({ user, filter }) {
        const watched = user.checked_flats;
        const favorite = user.favorite_flats;

        if (!favorite || !watched) {
            return null;
        }

        const recommendations = await strapi.entityService.findMany(filter.api, {
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
                data: { favorite_flats: [...user.favorite_flats, data.flatId] },
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
        const updateData = user.favorite_flats.filter((el) => el.id !== data.flatId);

        return await strapi.db
            .query(apiKey)
            .update({
                where,
                data: { favorite_flats: updateData },
                populate: true,
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
