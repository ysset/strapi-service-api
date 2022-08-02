'use strict';

/**
 * agent router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::agent.agent');
