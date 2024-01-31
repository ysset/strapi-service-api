'use strict';
const { v4 } = require('uuid');
const emailFile = require("../../../../emailLetter/emailFile");

module.exports = ({ strapi }) => ({
    async AddNewAuthor(ctx) {
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
                //TODO каким-то магическим способом создавать ссылку на оплату и брать оплату
                const payUrl = ''

                strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
                await strapi.mail.sendMail({
                    from: process.env.YANDEX_SMTP_FROM,
                    to: email,
                    subject: "Телеграм для бизнеса",
                    html: emailFile(email, password, payUrl, process.env.ADMIN_URL)
                }, (err, info) => {
                    if (err)
                        throw new Error(err)
                    strapi.log.info(`to ${email} -> res: ${info.response}`)
                })
            }

            const [bot] = await strapi.entityService.findMany('api::bot.bot', {
                data: {
                    token: botToken
                }
            })

            if (!bot) {
                await strapi.entityService.create('api::bot.bot', {
                    data: {
                        token: botToken,
                        isActive: false
                    }
                }).catch((e) => {
                    throw new Error(e)
                })
            }
            return ctx.send({ message: 'Bot created successfully!' }, 200);
        } catch (err) {
            strapi.log.error(err);
        }
    },
});
