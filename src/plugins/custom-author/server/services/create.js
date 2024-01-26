'use strict';
const { v4 } = require('uuid');
const Email = require('email-templates');

module.exports = ({ strapi }) => ({
    async create(ctx) {
        try {
            const { firstname, lastname, email, botToken } = ctx.request.body;
            const password = v4().toString();

            if (!firstname || !lastname || !email || !botToken) {
                // ctx.badRequest(message, details)
               strapi.log.error(`firstname, lastname, email are required fields`)
                return ctx.badRequest();
            }

            const author = await strapi.db.query('admin::user').findOne({ where: { email: email } });
            if (!author) {
               const adminUserData = {
                  firstname,
                  lastname,
                  email,
                  password,
                  roles: [3],
                  blocked: false,
                  isActive: true,
               };

               const admin = await strapi.admin.services.user.create(adminUserData);
               if (!admin) {
                  strapi.log.error(`Couldn't create author: ${email}\n ${admin}`);
                  return ctx.badRequest(admin);
               }
            }

            await strapi.entityService.create('api::bot.bot', {
               data: {
                  token: botToken,
                  isActive: false
               }
            }).catch(() => {
                return ctx.send({ message: 'Внутренняя ошибка сервера, убедитесь что токен бота уникален' }, 500);
            })

            strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
            const mailer = new Email({
                message: {
                    from: 'telegramForBusiness@gmail.com',
                    attachments: [
                        {
                            raw: `email: ${email}\npassword: ${password}`,
                        },
                    ],
                },
            });
            mailer
                .send({
                    template: 'mars',
                    message: {
                        to: 'kamdenech@gmail.com',
                    },
                })
                .then(console.log)
                .catch(console.error);
            return ctx.send({ message: 'Bot created successfully!' }, 200);
        } catch (err) {
            strapi.log.error(err);
        }
    },
});
