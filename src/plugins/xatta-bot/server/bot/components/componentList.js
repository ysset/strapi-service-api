const {
    writeAgent,
    save,
    searchFlats,
    repeatSearchFlats,
    favoriteHousings,
    fullDescription,
    enterCommand,
    deleteCommand,
    deleteCurrentMessage,
    nextFlat,
    searchFullDescription,
    favoriteFullDescription,
    searchWriteAgent,
    favoriteWriteAgent,
    previousFlat,
    cancelUserInterest,
} = require('./inlineCommands');

const commands = {
    SAVE: save,
    WRITE_AGENT: writeAgent,
    FAVORITE_HOUSINGS: favoriteHousings,
    SEARCH_FLATS: (query) => {
        deleteCurrentMessage(query)
            .then((success) => success && searchFlats(query).catch(console.error))
            .catch(console.error);
    },
    REPEAT_SEARCH_FLATS: repeatSearchFlats,
    FULL_DESCRIPTION: fullDescription,
    SEARCH_FULL_DESCRIPTION: searchFullDescription,
    FAVORITE_FULL_DESCRIPTION: favoriteFullDescription,
    ENTER_COMMAND: enterCommand,
    DELETE_ACTION: deleteCommand,
    DELETE_MESSAGE: deleteCurrentMessage,
    NEXT_FLAT: nextFlat,
    PREVIOUS_FLAT: previousFlat,
    SEARCH_WRITE_AGENT: searchWriteAgent,
    FAVORITE_WRITE_AGENT: favoriteWriteAgent,
    CANCEL_INTEREST: cancelUserInterest,
};

module.exports = commands;
