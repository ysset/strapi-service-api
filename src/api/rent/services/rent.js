'use strict';

/**
 * rent service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::rent.rent');
