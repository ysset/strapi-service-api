'use strict';

/**
 * service-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service-type.service-type');
