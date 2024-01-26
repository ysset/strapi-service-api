'use strict';

/**
 * telegram-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::telegram-user.telegram-user');
