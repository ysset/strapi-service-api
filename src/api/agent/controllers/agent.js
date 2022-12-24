'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const getData = async ({ api, field, language }) => {
    let res = await strapi.entityService.findMany(api, {
        filters: {
            localisation: { language },
        },
        populate: {
            localisation: {
                fields: ['language', field],
            },
            agent: true,
        },
    });
    res = res.filter((el) => el.agent);
    return res.map(
        (el) => el.localisation.find((el) => el.language === language || el.language === 'en')[field]
    );
};

const handleDeveloperComplexes = async () =>
    strapi.entityService.findMany('api::complex.complex', {
        filters: { localisation: { language: 'ru' } },
        populate: { localisation: { populate: { apartments: { fields: 'layout' } } } },
    });

const handleOwnerComplexes = async () =>
    strapi.entityService.findMany('api::owner.owner', {
        filters: { localisation: { language: 'ru' } },
        populate: { localisation: { layout: true } },
    });

const handleRent = async () =>
    strapi.entityService.findMany('api::rent.rent', {
        filters: { localisation: { language: 'ru' } },
        populate: { localisation: { layout: true } },
    });

const handleDeveloperVilla = async () =>
    strapi.entityService.findMany('api::villa.villa', {
        filters: { localisation: { language: 'ru' } },
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

    const rent = await strapi.entityService.findMany('api::rent.rent', {
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

    const villa = await strapi.entityService.findMany('api::villa.villa', {
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
        villa,
        owner,
        rent,
    };
};

module.exports = createCoreController('api::agent.agent', {
    getCities: async (ctx) => {
        const language = ctx.params.language;
        const complexCities = await getData({ api: 'api::complex.complex', field: 'city', language });
        const villaCities = await getData({ api: 'api::villa.villa', field: 'city', language });
        const ownerCities = await getData({ api: 'api::owner.owner', field: 'city', language });
        return {
            developer: [
                ...new Set([...complexCities.map((el) => el.trim()), ...villaCities.map((el) => el.trim())]),
            ].sort(),
            owner: [...new Set(ownerCities.map((el) => el.trim()))].sort(),
        };
    },

    getDistricts: async (ctx) => {
        const language = ctx.params.language;
        const complexDistricts = await getData({ api: 'api::complex.complex', field: 'district', language });
        const villaDistricts = await getData({ api: 'api::villa.villa', field: 'district', language });
        const ownerDistricts = await getData({ api: 'api::owner.owner', field: 'district', language });
        return [...new Set([...complexDistricts, ...villaDistricts, ...ownerDistricts])];
    },

    getCost: async () => {
        const { complex, owner, villa } = await handleGetCosts();
        const complexMin = complex.length ? complex[0].localisation[0].cost : 0;
        const complexMax = complex.length ? complex[complex.length - 1].localisation[0].cost : 0;
        const villaMin = villa.length ? villa[0].localisation[0].cost : 0;
        const villaMax = villa.length ? villa[villa.length - 1].localisation[0].cost : 0;
        const ownerMin = owner.length ? owner[0].localisation[0].cost : 0;
        const ownerMax = owner.length ? owner[owner.length - 1].localisation[0].cost : 0;
        const complexCosts = [villaMin, villaMax, complexMax, complexMin];
        complexCosts.sort((a, b) => a - b);

        const min = complexCosts[0];
        const max = complexCosts[complexCosts.length - 1];

        return {
            complex: [min === max ? 0 : min, max],
            owner: [ownerMin === ownerMax ? 0 : ownerMin, ownerMax],
        };
    },

    getLayouts: async () => {
        const developComplexes = await handleDeveloperComplexes();
        const ownerComplexes = await handleOwnerComplexes();
        const developVilla = await handleDeveloperVilla();

        const developerLayouts = developComplexes
            .flatMap((el) => el.localisation.find((el) => el.language === 'ru')?.apartments)
            .map((el) => el.layout)
            .filter((el = String) => el.trim().match(/^\d\+\d$/))
            .filter((el = String) => el.trim() !== '7+1');
        const ownerLayouts = ownerComplexes
            .flatMap((el) => el.localisation.find((el) => el.language === 'ru'))
            .map((el) => el.layout)
            .filter((el = String) => el.trim().match(/^\d\+\d$/))
            .filter((el = String) => el.trim() !== '7+1');
        const villaLayouts = developVilla
            .flatMap((el) => el.localisation.find((el) => el.language === 'ru')?.apartments)
            .map((el) => el.layout)
            .filter((el = String) => el.trim().match(/^\d\+\d$/))
            .filter((el = String) => el.trim() !== '7+1');
        return {
            developer: [...new Set([...new Set(developerLayouts), ...new Set(villaLayouts)])].sort(),
            owner: [...new Set(ownerLayouts)].sort(),
        };
    },

    getCitiesRent: async () => {
        const rents = await handleRent();
        const short = rents
            .filter((el) => el.term === 'short')
            .flatMap((el) => el.localisation.find((el) => el.language === 'ru'))
            .map((el) => el.city);
        const long = rents
            .filter((el) => el.term === 'long')
            .flatMap((el) => el.localisation.find((el) => el.language === 'ru'))
            .map((el) => el.city);
        return {
            short: [...new Set(short)],
            long: [...new Set(long)],
        };
    },

    getDistrictsRent: async () => {
        const districts = await getData({ api: 'api::rent.rent', field: 'district' });
        return [...new Set(districts)];
    },

    getCostRent: async () => {
        const { rent } = await handleGetCosts();
        const short = rent.filter((el) => el.term === 'short');
        const long = rent.filter((el) => el.term === 'long');
        const minShort = short.length ? short[0].localisation[0].cost : 0;
        const maxShort = short.length ? short[short.length - 1].localisation[0].cost : 0;
        const minLong = long.length ? long[0].localisation[0].cost : 0;
        const maxLong = long.length ? long[long.length - 1].localisation[0].cost : 0;

        return {
            short: [minShort === maxShort ? 0 : minShort, maxShort],
            long: [minLong === maxLong ? 0 : minLong, maxLong],
        };
    },

    getLayoutsRent: async () => {
        const apartments = await handleRent();
        const layoutsShort = apartments
            .filter((el) => el.term === 'short')
            .flatMap((el) => el.localisation.find((el) => el.language === 'ru'))
            .map((el) => el.layout)
            .filter((el = String) => el.trim().match('^[\\W\\d]+\\+[0-9]{1}$'));
        const layoutsLong = apartments
            .filter((el) => el.term === 'long')
            .flatMap((el) => el.localisation.find((el) => el.language === 'ru'))
            .map((el) => el.layout)
            .filter((el = String) => el.trim().match('^[\\W\\d]+\\+[0-9]{1}$'));
        return {
            short: [...new Set(layoutsShort)],
            long: [...new Set(layoutsLong)],
        };
    },
});
