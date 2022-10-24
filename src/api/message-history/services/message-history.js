'use strict';

/**
 * message-history service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::message-history.message-history');
