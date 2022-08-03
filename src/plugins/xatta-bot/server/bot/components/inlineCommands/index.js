const writeAgentFunc = require('./writeAgent');
const saveFunc = require('./save');
const searchFlatsFunc = require('./searchFlats');
const repeatSearchFlatsFunc = require('./repeatSearchFlats');
const favoriteHousingsFunc = require('./favoriteHousings');
const fullDescriptionFunc = require('./fullDescription');
const favoriteFunc = require('./favorite');
const searchFunc = require('./search');
const enterCommandFunc = require('./enterCommand');
const deleteFunc = require('./delete');
const deleteCurrentMessageFunc = require('./deleteCurrentMessage');

module.exports = {
    writeAgent: writeAgentFunc,
    save: saveFunc,
    searchFlats: searchFlatsFunc,
    repeatSearchFlats: repeatSearchFlatsFunc,
    favoriteHousings: favoriteHousingsFunc,
    favorite: favoriteFunc,
    search: searchFunc,
    fullDescription: fullDescriptionFunc,
    enterCommand: enterCommandFunc,
    deleteCommand: deleteFunc,
    deleteCurrentMessage: deleteCurrentMessageFunc,
};
