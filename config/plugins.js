module.exports = {
    // TODO перенести создание и управление бота в этот модуль
    'bot-console': {
        enabled: true,
        resolve: './src/plugins/bot-console',
    },
     'storage': {
      enabled: true,
      resolve: './src/plugins/storage'
    },
    'users-permissions': {
        config: {
            jwt: {
                expiresIn: '7d',
            },
        },
    },
    flags: {
        nps: false,
        promoteEE: false,
    },
};
