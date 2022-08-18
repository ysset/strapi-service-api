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
    ],
};
