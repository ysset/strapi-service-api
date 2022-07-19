const localisation = {
    ru: require('./ru'),
    en: require('./en'),
    ch: require('./ch'),
};

const userLang = (lang) => localisation[lang] || localisation.en;

module.exports = {
    userLang,
    localisation,
};
