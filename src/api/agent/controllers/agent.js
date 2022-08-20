'use strict';

/**
 *  agent controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const getData = async ({ api, field }) => {
    const res = await strapi.entityService.findMany(api, {
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
        const complexCities = await getData({ api: 'api::complex.complex', field: 'city' });
        const villaCities = await getData({ api: 'api::villa.villa', field: 'city' });
        const cities = [...new Set([...complexCities, ...villaCities])];
        switch (language) {
            case 'ru':
                return cities.filter((city) => city.match(/[А-Яа-я]+/));
            case 'en':
                return cities.filter((city) => city.match(/[A-Za-z]+/));
        }
    },

    getDistricts: async () => {
        const complexDistricts = await getData({ api: 'api::complex.complex', field: 'district' });
        const villaDistricts = await getData({ api: 'api::villa.villa', field: 'district' });
        // return list of original values
        return [...new Set([...complexDistricts, ...villaDistricts])];
    },

    getLayouts: async () => {
        const complexes = await strapi.entityService.findMany('api::complex.complex', {
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
        // return list of original values
        return [...new Set(layouts)];
    },
});
