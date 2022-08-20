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
} = require('./inlineCommands');

const commands = {
    SAVE: save,
    WRITE_AGENT: writeAgent,
    FAVORITE_HOUSINGS: favoriteHousings,
    SEARCH_FLATS: searchFlats,
    REPEAT_SEARCH_FLATS: repeatSearchFlats,
    FULL_DESCRIPTION: fullDescription,
    ENTER_COMMAND: enterCommand,
    DELETE_ACTION: deleteCommand,
    DELETE_MESSAGE: deleteCurrentMessage,
};

module.exports = commands;
