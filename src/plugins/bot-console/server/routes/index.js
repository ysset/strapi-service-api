const createNewBot = require("../services/createNewBot");
module.exports = [
    {
        method: 'POST',
        path: '/create-new-bot',
        handler: 'author.createNewBot',
       config: {
          // Set auth false to pass through to API token validation policy.
          auth: false,
          policies: ['plugin::bot-console.has-full-access-token']
       },
    },
];
