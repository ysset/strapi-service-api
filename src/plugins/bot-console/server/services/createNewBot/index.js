'use strict';
const { v4 } = require('uuid');
const { createBotOwner } = require('./createOwner');

module.exports = ({ strapi }) => ({
    async createNewBot(ctx) {
        try {
            const { firstname, lastname, email, username, telegramId } = ctx.request.body;

            if (!firstname || !email) {
                strapi.log.error(`firstname, lastname, email are required fields`);
                return ctx.badRequest(`firstname, lastname, email are required fields`);
            }

            let owner = await strapi.db.query('admin::user').findOne({ where: { email: email } });
            if (!owner) {
                owner = await createBotOwner({
                    firstname,
                    lastname,
                    email,
                    username,
                    telegramId
                });
            }

            return ctx.send(owner, 200);
        } catch (err) {
            strapi.log.error(err);
        }
    },
});
