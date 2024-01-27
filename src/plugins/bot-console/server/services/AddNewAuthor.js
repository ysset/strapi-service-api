'use strict';
const { v4 } = require('uuid');
const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'Yandex',
    host: process.env.YANDEX_SMTP_HOST,
    port: process.env.YANDEX_SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.YANDEX_SMTP_USER,
        pass: process.env.YANDEX_SMTP_USER_PASS,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

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
            await transporter.sendMail({
                from: process.env.YANDEX_SMTP_FROM,
                to: "kamdenech@gmail.com",
                subject: 'Hello',
                text: "xyi"
            }, console.log)
            return ctx.send({ message: 'Bot created successfully!' }, 200);
        } catch (err) {
            strapi.log.error(err);
        }
    },
});
