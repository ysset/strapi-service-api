'use strict';

/**
 *  agent controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const getData = async ({ api, field, language }) => {
    const res = await strapi.entityService.findMany(api, {
        filters: {
            localisation: {
                language,
            },
        },
        populate: {
            localisation: {
                fields: field,
            },
        },
    });
    return res.map((el) => el.localisation[0][field]);
};

module.exports = createCoreController('api::agent.agent', {
    getCities: async (ctx) => {
        const { language } = ctx.params;
        const complexCities = await getData({ api: 'api::complex.complex', field: 'city', language });
        const villaCities = await getData({ api: 'api::villa.villa', field: 'city', language });
        return [...new Set([...complexCities, ...villaCities])];
    },

    getDistricts: async (ctx) => {
        const { language } = ctx.params;
        const complexDistricts = await getData({ api: 'api::complex.complex', field: 'district', language });
        const villaDistricts = await getData({ api: 'api::villa.villa', field: 'district', language });
        return [...new Set([...complexDistricts, ...villaDistricts])];
    },

    getLayouts: async (ctx) => {
        const { language } = ctx.params;
        const complexes = await strapi.entityService.findMany('api::complex.complex', {
            filters: {
                localisation: {
                    language,
                },
            },
            populate: {
                localisation: {
                    populate: {
                        apartments: {
                            fields: 'layout',
                        },
                    },
                },
            },
        });
        const apartments = complexes.flatMap((el) => el.localisation[0].apartments);
        const layouts = apartments.map((el) => el.layout);
        return [...new Set(layouts)];
    },
});
