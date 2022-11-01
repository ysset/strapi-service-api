const localisation = {
    ru: {
        rent: require('./ru/rent'),
        realtor: require('./ru/realtor'),
        admin: {},
    },
    en: {
        rent: require('./ru/rent'),
        realtor: require('./ru/realtor'),
        admin: {},
    },
};

const userLang = ({ language, type }) => localisation[language][type] || localisation.en[type];

module.exports = {
    userLang,
    localisation,
};
