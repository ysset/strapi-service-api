const writeAgentFunc = require('./writeAgent');
const searchWriteAgentFunc = require('./searchWriteAgent');
const favoriteWriteAgentFunc = require('./favoriteWriteAgent');
const saveFunc = require('./save');
const searchFlatsFunc = require('./searchFlats');
const repeatSearchFlatsFunc = require('./repeatSearchFlats');
const favoriteHousingsFunc = require('./favoriteHousings');
const fullDescriptionFunc = require('./fullDescription');
const favoriteFullDescriptionFunc = require('./favoriteFullDescription');
const searchFullDescriptionFunc = require('./searchFullDescription');
const enterCommandFunc = require('./enterCommand');
const deleteFunc = require('./delete');
const nextFlatFunc = require('./nextFlat');
const previousFlatFunc = require('./previousFlat');
const cancelUserInterestFunc = require('./cancelUserInterest');
const searchFlatByIdFunc = require('./searchFlatById');
const searchFullDescriptionNextFlatFunc = require('./searchFullDescriptionNextFlat');
const cancelInfoTourFunc = require('./cancelInfoTour');
const infoTourFunc = require('./infoTour');
const swaffd = require('./searchWriteAgentForFullDesc');

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
    nextFlat: nextFlatFunc,
    previousFlat: previousFlatFunc,
    cancelUserInterest: cancelUserInterestFunc,
    searchFlatById: searchFlatByIdFunc,
    searchFullDescriptionNextFlat: searchFullDescriptionNextFlatFunc,
    cancelInfoTour: cancelInfoTourFunc,
    infoTour: infoTourFunc,
    swaffd: swaffd,
    cancelInfoTour: require('./cancelInfoTour'),
};
