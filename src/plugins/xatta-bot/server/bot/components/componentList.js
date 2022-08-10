/**
 *  ~deprecated~
 */

const {
    writeAgent,
    save,
    searchFlats,
    repeatSearchFlats,
    favoriteHousings,
    favorite,
    search,
    fullDescription,
    enterCommand,
    deleteCommand,
    deleteCurrentMessage,
} = require('./inlineCommands');

const commands = {
    SAVE: save,
    WRITE_AGENT: writeAgent,
    FAVORITE_HOUSINGS: favoriteHousings,
    FAVORITE: favorite,
    SEARCH: async (query) => {
        await deleteCurrentMessage(query);
        return await search(query);
    },
    SEARCH_FLATS: async (query) => {
        await deleteCurrentMessage(query);
        return await searchFlats(query);
    },
    REPEAT_SEARCH_FLATS: repeatSearchFlats,
    FULL_DESCRIPTION: fullDescription,
    ENTER_COMMAND: enterCommand,
    DELETE_ACTION: deleteCommand,
    DELETE_MESSAGE: deleteCurrentMessage,
};

module.exports = commands;
