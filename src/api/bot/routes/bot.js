'use strict';

/**
 * bot router
 */

module.exports = {
    routes: [
        { // Path defined with an URL parameter
            method: 'GET',
            path: '/bot/all', 
            handler: 'bot.findAll',
        }
    ]
}