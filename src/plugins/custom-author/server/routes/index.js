module.exports = [
  {
    method: 'POST',
    path: '/create',
    handler: 'customAuthor.create',
    config: {
      policies: [],
    },
  },
];
