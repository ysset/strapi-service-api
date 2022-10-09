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
        {
            method: 'GET',
            path: '/costs',
            handler: 'agent.getCost',
            config: {
                policies: [],
            },
        },

        {
            method: 'GET',
            path: '/rent/cities',
            handler: 'agent.getCitiesRent',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/rent/districts',
            handler: 'agent.getDistrictsRent',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/rent/layouts',
            handler: 'agent.getLayoutsRent',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/rent/costs',
            handler: 'agent.getCostRent',
            config: {
                policies: [],
            },
        },
    ],
};
