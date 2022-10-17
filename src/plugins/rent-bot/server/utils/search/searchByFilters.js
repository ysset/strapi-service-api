const { dateStorage } = require('../index');
const getDate = require('../event/getDate');

const configureFilters = (userFilters = {}) => ({
    $and: [
        {
            localisation: {
                $and: [
                    { language: 'ru' },
                    userFilters.cities.length ? { cities: { $in: userFilters.cities } } : {},
                    { cost: { $gte: userFilters.prices[0] || 0, $lte: userFilters.prices[1] } },
                    userFilters.layouts.length ? { layout: { $in: userFilters.layouts } } : {},
                    { type: { $in: userFilters.housings || ['villa', 'apartment'] } },
                ],
            },
        },
        { term: userFilters.term },
    ],
});

module.exports = async (bot) => {
    let { user, filters } = bot;
    filters = filters || user.filters.rent || user.filters.last;
    if (!filters) return;

    const watched = user.watchedRent || [];
    const favorite = user.favoriteRent || [];
    const table = 'rent';
    const api = 'api::rent.rent';
    let dates = dateStorage.dates.get(parseInt(user.telegramID));

    // if user didn't set date, ask it
    if (!dates || !dates.length) {
        await getDate(bot);
        dates = dateStorage.dates.get(parseInt(user.telegramID));
    }

    if (!dates || !dates.length) return null;

    filters.layouts
        .filter((el) => el.match(/^ \d\+\d$/))
        .map((el) => [`${el}`, `${el} Duplex`, `${el} Garden Duplex`, `${el} Penthouse`])
        .flat(1);

    await strapi.entityService
        .update('api::telegram-user.telegram-user', user.id, {
            data: {
                filters: JSON.stringify({
                    ...user.filters,
                    [filters.term]: filters,
                    last: filters,
                }),
            },
        })
        .catch(console.error);

    let apartments = await strapi.entityService
        .findMany(api, {
            filters: configureFilters(filters),
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
                dates: true,
            },
        })
        .then((r) =>
            r.map((el) => {
                el.table = table;
                el.api = api;
                return el;
            })
        );

    apartments = apartments
        .filter(
            (apartment) =>
                !apartment.dates.some((date) => date.arrival > dates[0] && date.departure < dates[1])
        )
        .filter((apartment) => !watched.some((watched) => apartment.id === watched.id))
        .map((el) => {
            if (favorite.some((favorite) => favorite.id === el.id)) {
                el.favorite = true;
            }
            return el;
        });

    if (apartments.length === 0) return null;

    return apartments[Math.floor(Math.random() * apartments.length)];
};
