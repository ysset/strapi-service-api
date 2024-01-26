module.exports = [
    {
        method: 'POST',
        path: '/create',
        handler: 'customAuthor.create',
       config: {
          // Set auth to false to pass through to API token validation policy.
          auth: false,
          policies: ['plugin::custom-author.has-full-access-token']
       },
    },
];
