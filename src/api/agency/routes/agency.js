'use strict';

/**
 * agency router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::agency.agency');
