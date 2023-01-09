'use strict';

/**
 * bla-bla-car-client router
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/bla-bla-car-driver/:id',
            handler: 'driver.findDriver',
        },
    ],
};
