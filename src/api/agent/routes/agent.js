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
            path: '/districts/:language',
            handler: 'agent.getDistricts',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/layouts/:language',
            handler: 'agent.getLayouts',
            config: {
                policies: [],
            },
        },
    ],
};
