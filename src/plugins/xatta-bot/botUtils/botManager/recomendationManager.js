module.exports = {
    /**
     * @param user
     * @param api
     * @returns {Promise<null|*>}
     */
    async get({ user, api }) {
        const watched = [...user.watchedComplex, ...user.watchedVilla];
        const favorite = [...user.favoriteComplex, ...user.favoriteVilla];
        // TODO if we have 100,000,000 fields, we will have to do optimization
        const recommendations = await strapi.entityService.findMany(api, {
            populate: '*',
        });
        console.log(watched, favorite, recommendations);

        let filtered = recommendations
            .filter((rec) => !favorite.some((favorite) => rec.id === favorite.id)) //delete all favorites
            .filter((filtered) => !watched.some((watched) => watched.id === filtered.id)); //delete all watched

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
