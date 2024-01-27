module.exports = [
    {
        method: 'POST',
        path: '/createNewAuthor',
        handler: 'author.createNewAuthor',
       config: {
          // Set auth to false to pass through to API token validation policy.
          auth: false,
          policies: ['plugin::bot-console.has-full-access-token']
       },
    },
];
