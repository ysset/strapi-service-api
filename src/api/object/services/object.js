'use strict';

/**
 * object service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::object.object');
