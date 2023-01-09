'use strict';

/**
 * agency service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::agency.agency');
