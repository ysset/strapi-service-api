module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/user-filters',
            handler: 'telegram-user.userFilters',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/user-favorites',
            handler: 'telegram-user.userFavorites',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/search',
            handler: 'telegram-user.search',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/search/rent',
            handler: 'telegram-user.searchRent',
            config: {
                policies: [],
            },
        },
    ],
};
