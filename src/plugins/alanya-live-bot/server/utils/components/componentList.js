const {
    favorite,
    favoriteCars,
    favoriteFlats,
    researchFlat,
    searchFlats,
    search,
    researchCars,
    searchCars,
} = require('./keyboardCommands');

const { writeAgent, save, next } = require('./inlineCommands');

const commands = {
    FAVORITE: favorite,
    FAVORITE_CARS: favoriteCars,
    FAVORITE_FLATS: favoriteFlats,

    SEARCH: search,
    SEARCH_FLATS: searchFlats,
    REPEAT_SEARCH_FLATS: researchFlat,
    SEARCH_CARS: searchCars,
    REPEAT_SEARCH_CARS: researchCars,

    inlineCallBacks: {
        NEXT: async (query) => {
            await next(query);
            return commands.callCommand(query);
        },
        SAVE: async (query) => {
            await save(query);
            return commands.callCommand(query);
        },
        WRITE_AGENT: writeAgent,
    },

    callCommand: async (query) =>
        await commands[`SEARCH_${query.data.type}`]({
            ...query.message,
            from: query.from,
            user: query.user,
        }),
};

module.exports = commands;
