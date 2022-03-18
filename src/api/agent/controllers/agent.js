'use strict';

/**
 *  agent controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::agent.agent');
