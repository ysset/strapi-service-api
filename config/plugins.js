
module.exports = {
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
};
