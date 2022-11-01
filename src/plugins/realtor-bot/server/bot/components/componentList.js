const {
    writeAgent,
    save,
    searchFlats,
    repeatSearchFlats,
    favoriteHousings,
    fullDescription,
    enterCommand,
    deleteCommand,
    nextFlat,
    searchFullDescription,
    favoriteFullDescription,
    searchWriteAgent,
    favoriteWriteAgent,
    previousFlat,
    cancelUserInterest,
    searchFullDescriptionNextFlat,
} = require('./inlineCommands');

const commands = {
    SAVE: save,
    WRITE_AGENT: writeAgent,
    FAVORITE_HOUSINGS: favoriteHousings,
    SEARCH_FLATS: searchFlats,
    REPEAT_SEARCH_FLATS: repeatSearchFlats,
    FULL_DESCRIPTION: fullDescription,
    SEARCH_FULL_DESCRIPTION: searchFullDescription,
    FAVORITE_FULL_DESCRIPTION: favoriteFullDescription,
    ENTER_COMMAND: enterCommand,
    DELETE_ACTION: deleteCommand,
    NEXT_FLAT: nextFlat,
    PREVIOUS_FLAT: previousFlat,
    SEARCH_WRITE_AGENT: searchWriteAgent,
    FAVORITE_WRITE_AGENT: favoriteWriteAgent,
    CANCEL_INTEREST: cancelUserInterest,
    SFDNF: searchFullDescriptionNextFlat,
};

module.exports = commands;
