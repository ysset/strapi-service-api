const { validate } = require("@strapi/utils");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::service-type.service-type",
  ({ strapi }) => ({
     async findOne(ctx) {
        const entities = await strapi.entityService.findOne(
          'api::service-type.service-type',
          ctx.request.params.id,
          {populate: '*'}
        );
        return entities;
     },
  })
);
