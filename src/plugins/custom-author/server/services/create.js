'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = ({ strapi }) => ({
    async create(ctx) {
        try {
            const { firstname, lastname, email, botToken } = ctx.request.body;
            const password = uuidv4();
            if (!firstname || !lastname || !email || !password) {
                // ctx.badRequest(message, details)
                return ctx.badRequest(`firstname, lastname, email and password are required fields`);
            }

            const user = await strapi.db.query('admin::user').findOne({ where: { email: email } });
            if (user) {
                strapi.log.error(`Couldn't create author: ${email} already exists`);
                return ctx.badRequest(`${email} already exists`);
            }
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

            strapi.entityService('api::bot:bot').create({
                token: botToken,
            });

            strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
            const mailer = new Email({
                message: {
                    from: 'telegram_for_business@gmail.com',
                    attachments: [
                        {
                            raw: 'hello',
                        },
                    ],
                },
                // uncomment below to send emails in development/test env:
                // send: true
                transport: {
                    jsonTransport: true,
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
            return ctx.send({ message: 'Author created successfully!', details: response }, 200);
        } catch (err) {
            return ctx.internalServerError(err.message);
        }
    },
});
