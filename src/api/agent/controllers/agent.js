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
                fields: ['language', field],
            },
        },
    });
    return res.map((el) => el.localisation.find((el) => el.language === language)[field]);
};

const handleDeveloperComplexes = async (language) => {
    return await strapi.entityService.findMany('api::complex.complex', {
        filters: { localisation: { language } },
        populate: { localisation: { populate: { apartments: { fields: 'layout' } } } },
    });
};

const handleOwnerComplexes = async (language) => {
    return await strapi.entityService.findMany('api::owner-apartment.owner-apartment', {
        filters: { localisation: { language } },
        populate: { localisation: { layout: true } },
    });
};

module.exports = createCoreController('api::agent.agent', {
    getCities: async (ctx) => {
        const { language } = ctx.params;
        const complexCities = await getData({ api: 'api::complex.complex', field: 'city', language });
        const villaCities = await getData({ api: 'api::villa.villa', field: 'city', language });
        const ownerCities = await getData({
            api: 'api::owner-apartment.owner-apartment',
            field: 'city',
            language,
        });
        return {
            developer: [...new Set([...complexCities, ...villaCities])],
            owner: [...new Set(ownerCities)],
        };
    },

    getDistricts: async (ctx) => {
        const { language } = ctx.params;
        const complexDistricts = await getData({ api: 'api::complex.complex', field: 'district', language });
        const villaDistricts = await getData({ api: 'api::villa.villa', field: 'district', language });
        return [...new Set([...complexDistricts, ...villaDistricts])];
    },

    getLayouts: async (ctx) => {
        const { language } = ctx.params;
        const developComplexes = await handleDeveloperComplexes(language);
        const ownerComplexes = await handleOwnerComplexes(language);
        const developerApartments = developComplexes.flatMap(
            (el) => el.localisation.find((el) => el.language === language)?.apartments
        );
        const ownerLocalisation = ownerComplexes.flatMap((el) =>
            el.localisation.find((el) => el.language === language)
        );
        const developerLayouts = developerApartments.map((el) => el.layout);
        const ownerLayouts = ownerLocalisation.map((el) => el.layout);
        return { developer: [...new Set(developerLayouts)], owner: [...new Set(ownerLayouts)] };
    },
});
