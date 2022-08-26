const writeAgentFunc = require('./writeAgent');
const searchWriteAgentFunc = require('./favoriteWriteAgent');
const favoriteWriteAgentFunc = require('./searchWriteAgent');
const saveFunc = require('./save');
const searchFlatsFunc = require('./searchFlats');
const repeatSearchFlatsFunc = require('./repeatSearchFlats');
const favoriteHousingsFunc = require('./favoriteHousings');
const fullDescriptionFunc = require('./fullDescription');
const favoriteFullDescriptionFunc = require('./favoriteFullDescription');
const searchFullDescriptionFunc = require('./searchFullDescription');
const enterCommandFunc = require('./enterCommand');
const deleteFunc = require('./delete');
const deleteCurrentMessageFunc = require('./deleteCurrentMessage');
const nextFlatFunc = require('./nextFlat');

module.exports = {
    writeAgent: writeAgentFunc,
    favoriteWriteAgent: favoriteWriteAgentFunc,
    searchWriteAgent: searchWriteAgentFunc,
    save: saveFunc,
    searchFlats: searchFlatsFunc,
    repeatSearchFlats: repeatSearchFlatsFunc,
    favoriteHousings: favoriteHousingsFunc,
    favoriteFullDescription: favoriteFullDescriptionFunc,
    searchFullDescription: searchFullDescriptionFunc,
    fullDescription: fullDescriptionFunc,
    enterCommand: enterCommandFunc,
    deleteCommand: deleteFunc,
    deleteCurrentMessage: deleteCurrentMessageFunc,
    nextFlat: nextFlatFunc,
};
