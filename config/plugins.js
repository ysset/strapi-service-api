
module.exports = {
   'bot-console': {
      enabled: true,
      resolve: './src/plugins/bot-console',
   },
   // email: {
   //    provider: process.env.SMTP_PROVIDER,
   //    providerOptions: {
   //       host: process.env.YANDEX_SMTP_HOST,
   //       port: process.env.YANDEX_SMTP_PORT,
   //       auth: {
   //          user: process.env.YANDEX_SMTP_USER,
   //          pass: process.env.YANDEX_SMTP_USER_PASS,
   //       },
   //    },
   //    settings: {
   //       defaultFrom: process.env.YANDEX_SMTP_FROM,
   //       defaultReplyTo: 'kamdenech@gmail.com',
   //    },
   // }
};
