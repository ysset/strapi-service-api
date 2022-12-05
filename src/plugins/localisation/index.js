const localisation = {
    ru: {
        rent: require('./ru/rent'),
        realtor: require('./ru/realtor'),
        admin: {},
        presentation: require('./ru/presentation'),
    },
    en: {
        rent: require('./ru/rent'),
        realtor: require('./en/realtor'),
        admin: {},
    },
};

const userLang = ({ language, type }) => localisation[language][type] || localisation.en[type];

module.exports = {
    userLang,
    localisation,
};
