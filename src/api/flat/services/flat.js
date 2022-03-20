'use strict';

/**
 * flat service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flat.flat');
