const localisation = {
    ru: require('./ru'),
};

const userLang = (lang) => localisation[lang] || localisation.ru;

module.exports = {
    userLang,
    localisation,
};
