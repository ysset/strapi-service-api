/**
 *  ~deprecated~
 */
const { favoriteCars, researchCars, searchCars } = require('./keyboardCommands');

const {
    writeAgent,
    save,
    next,
    searchFlats,
    repeatSearchFlats,
    favoriteFlats,
    favorite,
    search,
    fullDescription,
    enterCommand,
} = require('./inlineCommands');

const commands = {
    FAVORITE_CARS: favoriteCars,

    SEARCH_CARS: searchCars,
    REPEAT_SEARCH_CARS: researchCars,

    // inlineCallBacks: {
    NEXT: async (query) => {
        await next(query);
        console.log(query);
        return commands.callCommand(query);
    },
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
    // },

    callCommand: async (query) =>
        await commands[`SEARCH_${query.data.type}`]({
            ...query.message,
            from: query.from,
            user: query.user,
        }),
};

module.exports = commands;
