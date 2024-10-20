"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::bot.bot", ({ strapi }) => ({
  async findAll(ctx) {
    const res = strapi.entityService.findMany(
        "api::bot.bot",
        {
           filters: {
            isActive: true
           } 
        }
    )

    return res;
  },
}));