const writeAgentFunc = require('./writeAgent');
const saveFunc = require('./save');
const searchFlatsFunc = require('./searchFlats');
const repeatSearchFlatsFunc = require('./repeatSearchFlats');
const favoriteFlatsFunc = require('./favoriteFlats');
const fullDescriptionFunc = require('./fullDescription');
const favoriteFunc = require('./favorite');
const searchFunc = require('./search');
const enterCommandFunc = require('./enterCommand');

module.exports = {
    writeAgent: writeAgentFunc,
    save: saveFunc,
    searchFlats: searchFlatsFunc,
    repeatSearchFlats: repeatSearchFlatsFunc,
    favoriteFlats: favoriteFlatsFunc,
    favorite: favoriteFunc,
    search: searchFunc,
    fullDescription: fullDescriptionFunc,
    enterCommand: enterCommandFunc,
};
