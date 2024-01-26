'use strict';

/**
 * bot service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bot.bot');
