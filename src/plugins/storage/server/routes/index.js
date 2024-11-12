module.exports = [
  {
    type: 'admin',
    method: 'GET',
    path: '/all',
    handler: 'adminController.index',
    config: {
      // policies: ['plugin::storage.has-full-access-token'],
      auth: false
    },
  },
];
