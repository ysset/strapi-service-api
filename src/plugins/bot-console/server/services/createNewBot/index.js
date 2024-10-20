'use strict';
const { v4 } = require('uuid');
const {createBotOwner} = require("./createOwner");

module.exports = ({ strapi }) => ({
    async createNewBot(ctx) {
        try {
            const { firstname, lastname, email, botToken } = ctx.request.body;
            const password = v4().toString();

            if (!firstname || !lastname || !email || !botToken) {
                // ctx.badRequest(message, details)
               strapi.log.error(`firstname, lastname, email are required fields`)
                return ctx.badRequest();
            }

            let owner = await strapi.db.query('admin::user').findOne({ where: { email: email } });
            if (!owner) {
               owner = await createBotOwner({
                    firstname,
                    lastname,
                    email,
                    password
                })
            }

            const [bot] = await strapi.entityService.findMany('api::bot.bot', {
                filters: {
                    token: botToken
                }
            })

            if (!bot) {
                await strapi.entityService.create('api::bot.bot', {
                    data: {
                        token: botToken,
                        isActive: false,
                        owner
                    }
                }).catch((e) => {
                    throw new Error(e)
                })
            }
            //TODO редирект на страницу оплаты
            return ctx.send({ message: 'Bot created successfully!' }, 200);
        } catch (err) {
            strapi.log.error(err);
        }
    },
});
