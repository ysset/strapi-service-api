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
} = require('./inlineCommands');

const commands = {
    SAVE: save,
    WRITE_AGENT: writeAgent,
    FAVORITE_HOUSINGS: favoriteHousings,
    SEARCH_FLATS: async (query) => {
        deleteCurrentMessage(query);
        await searchFlats(query);
    },
    REPEAT_SEARCH_FLATS: repeatSearchFlats,
    FULL_DESCRIPTION: fullDescription,
    ENTER_COMMAND: enterCommand,
    DELETE_ACTION: deleteCommand,
    DELETE_MESSAGE: deleteCurrentMessage,
    NEXT_FLAT: nextFlat,
};

module.exports = commands;
