/**
 *  ~deprecated~
 */

const {
    writeAgent,
    save,
    searchFlats,
    repeatSearchFlats,
    favoriteFlats,
    favorite,
    search,
    fullDescription,
    enterCommand,
    deleteCommand,
} = require('./inlineCommands');

const commands = {
    NEXT: async (query) => commands.callCommand(query),
    SAVE: async (query) => {
        await save(query);
        return commands.callCommand(query);
    },
    WRITE_AGENT: writeAgent,
    SEARCH_FLATS: searchFlats,
    REPEAT_SEARCH_FLATS: repeatSearchFlats,
    FAVORITE_FLATS: favoriteFlats,
    FAVORITE: favorite,
    SEARCH: search,
    FULL_DESCRIPTION: fullDescription,
    ENTER_COMMAND: enterCommand,
    DELETE_ACTION: deleteCommand,

    callCommand: async (query) =>
        await commands[`SEARCH_${query.data.type}`]({
            ...query,
            from: query.from,
            user: query.user,
        }),
};

module.exports = commands;
