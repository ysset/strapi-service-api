"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::bot.bot", ({ strapi }) => ({
  findAll(ctx) {
    return strapi.entityService.findMany(
        "api::bot.bot",
        {
           filters: {
            isActive: true
           } 
        }
    )
  },
}));