'use strict';

/**
 * agent router.
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/cities/:language',
            handler: 'agent.getCities',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/districts',
            handler: 'agent.getDistricts',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/layouts',
            handler: 'agent.getLayouts',
            config: {
                policies: [],
            },
        },
    ],
};
