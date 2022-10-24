'use strict';

/**
 * message-history router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::message-history.message-history');
