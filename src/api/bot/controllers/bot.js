'use strict';

/**
 * bot controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bot.bot');
