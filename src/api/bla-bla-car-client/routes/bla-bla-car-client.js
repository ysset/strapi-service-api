'use strict';

/**
 * bla-bla-car-client router
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/bla-bla-car-client/:id',
            handler: 'bla-bla-car-client.findClient',
        },
    ],
};
