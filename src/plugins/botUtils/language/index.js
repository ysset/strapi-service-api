const ru = require('./ru');
const en = require('./en');

const localisation = {
    currentLang: null,
    ru,
    en,
};

const userLang = (lang) => {
    if (localisation[lang]) return localisation[lang];
    return localisation.en;
};

module.exports = {
    userLang,
    localisation,
};
