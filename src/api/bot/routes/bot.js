'use strict';

/**
 * bot router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
    routes: [
        { // Path defined with an URL parameter
            method: 'GET',
            path: '/bot/all', 
            handler: 'bot.getAll',
        }
    ]
}