const localisation = {
    ru: require('./ru'),
    en: require('./en'),
    ch: require('./ch'),
};

const userLang = (lang) => {
    // if (localisation[lang]) return localisation[lang];
    return localisation.ru;
};

module.exports = {
    userLang,
    localisation,
};
