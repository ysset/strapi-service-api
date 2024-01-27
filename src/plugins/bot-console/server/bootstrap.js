'use strict';

const nodemailer = require("nodemailer");
module.exports = ({ strapi }) => {
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

    strapi.mail = transporter;
    return strapi;
};
