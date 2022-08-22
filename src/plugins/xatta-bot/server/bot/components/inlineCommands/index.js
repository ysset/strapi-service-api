const writeAgentFunc = require('./writeAgent');
const saveFunc = require('./save');
const searchFlatsFunc = require('./searchFlats');
const repeatSearchFlatsFunc = require('./repeatSearchFlats');
const favoriteHousingsFunc = require('./favoriteHousings');
const fullDescriptionFunc = require('./fullDescription');
const enterCommandFunc = require('./enterCommand');
const deleteFunc = require('./delete');
const deleteCurrentMessageFunc = require('./deleteCurrentMessage');
const nextFlatFunc = require('./nextFlat');

module.exports = {
    writeAgent: writeAgentFunc,
    save: saveFunc,
    searchFlats: searchFlatsFunc,
    repeatSearchFlats: repeatSearchFlatsFunc,
    favoriteHousings: favoriteHousingsFunc,
    fullDescription: fullDescriptionFunc,
    enterCommand: enterCommandFunc,
    deleteCommand: deleteFunc,
    deleteCurrentMessage: deleteCurrentMessageFunc,
    nextFlat: nextFlatFunc,
};
