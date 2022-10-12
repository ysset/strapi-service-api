'use strict';

/**
 *  agent controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const getData = async ({ api, field, language }) => {
    let res = await strapi.entityService.findMany(api, {
        filters: {
            localisation: {
                language,
            },
        },
        populate: {
            localisation: {
                fields: ['language', field],
            },
            agent: true,
        },
    });
    res = res.filter((el) => el.agent);
    return res.map((el) => el.localisation.find((el) => el.language === language)[field]);
};

const handleDeveloperComplexes = async (language) =>
    strapi.entityService.findMany('api::complex.complex', {
        filters: { localisation: { language } },
        populate: { localisation: { populate: { apartments: { fields: 'layout' } } } },
    });

const handleOwnerComplexes = async (language) =>
    strapi.entityService.findMany('api::owner.owner', {
        filters: { localisation: { language } },
        populate: { localisation: { layout: true } },
    });

const handleDeveloperVilla = async (language) =>
    strapi.entityService.findMany('api::villa.villa', {
        filters: { localisation: { language } },
        populate: { localisation: { populate: { apartments: { fields: 'layout' } } } },
    });

const handleGetCosts = async () => {
    const owner = await strapi.entityService.findMany('api::owner.owner', {
        populate: {
            localisation: {
                fields: ['cost'],
            },
        },
        sort: {
            localisation: {
                cost: 'asc',
            },
        },
    });

    const complex = await strapi.entityService.findMany('api::complex.complex', {
        populate: {
            localisation: {
                fields: ['cost'],
            },
        },
        sort: {
            localisation: {
                cost: 'asc',
            },
        },
    });

    return {
        complex,
        owner,
    };
};

module.exports = createCoreController('api::agent.agent', {
    getCities: async (ctx) => {
        const { language } = ctx.params;
        const complexCities = await getData({ api: 'api::complex.complex', field: 'city', language });
        const villaCities = await getData({ api: 'api::villa.villa', field: 'city', language });
        const ownerCities = await getData({
            api: 'api::owner.owner',
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

    getCost: async () => {
        const { complex, owner } = await handleGetCosts();
        const complexMin = complex.length ? complex[0].localisation[0].cost : 0;
        const complexMax = complex.length ? complex[complex.length - 1].localisation[0].cost : 0;
        const ownerMin = owner.length ? owner[0].localisation[0].cost : 0;
        const ownerMax = owner.length ? owner[owner.length - 1].localisation[0].cost : 0;

        return {
            complex: [complexMin === complexMax ? 0 : complexMin, complexMax],
            owner: [ownerMin === ownerMax ? 0 : ownerMin, ownerMax],
        };
    },

    getLayouts: async (ctx) => {
        const { language } = ctx.params;
        const developComplexes = await handleDeveloperComplexes(language);
        const ownerComplexes = await handleOwnerComplexes(language);
        const developVilla = await handleDeveloperVilla(language);
        const developerApartments = developComplexes.flatMap(
            (el) => el.localisation.find((el) => el.language === language)?.apartments
        );
        const ownerLocalisation = ownerComplexes.flatMap((el) =>
            el.localisation.find((el) => el.language === language)
        );
        const villaLocalisation = developVilla.flatMap(
            (el) => el.localisation.find((el) => el.language === language)?.apartments
        );

        const developerLayouts = developerApartments
            .map((el) => el.layout)
            .filter((el = String) => el.trim().match(/^\d\+\d$/))
            .filter((el = String) => el.trim() !== '7+1');
        const ownerLayouts = ownerLocalisation
            .map((el) => el.layout)
            .filter((el = String) => el.trim().match(/^\d\+\d$/))
            .filter((el = String) => el.trim() !== '7+1');
        const villaLayouts = villaLocalisation
            .map((el) => el.layout)
            .filter((el = String) => el.trim().match(/^\d\+\d$/))
            .filter((el = String) => el.trim() !== '7+1');
        return {
            developer: [...new Set([...new Set(developerLayouts), ...new Set(villaLayouts)])],
            owner: [...new Set(ownerLayouts)],
        };
    },
});
