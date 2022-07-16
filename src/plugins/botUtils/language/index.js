const ru = require('./ru');
const en = require('./en');
const ch = require('./ch');

const localisation = {
    currentLang: null,
    ru,
    en,
    ch,
};

const userLang = (lang) => {
    if (localisation[lang]) return localisation[lang];
    return localisation.en;
};

module.exports = {
    userLang,
    localisation,
};
