const callbacks = require('./componentList');

const index = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            await inlineCallBacks.ENTER_COMMAND(msg);
            return inlineCallBacks.DELETE_MESSAGE(msg);
        },
    },
};

const inlineCallBacks = {
    SAVE: callbacks.SAVE,
    SWA: callbacks.SEARCH_WRITE_AGENT,
    FWA: callbacks.FAVORITE_WRITE_AGENT,
    SEARCH_FLATS: callbacks.SEARCH_FLATS,
    REPEAT_SEARCH_FLATS: callbacks.REPEAT_SEARCH_FLATS,
    FAVORITE_HOUSINGS: callbacks.FAVORITE_HOUSINGS,
    SFD: callbacks.SEARCH_FULL_DESCRIPTION,
    FFD: callbacks.FAVORITE_FULL_DESCRIPTION,
    ENTER_COMMAND: callbacks.ENTER_COMMAND,
    DELETE_ACTION: callbacks.DELETE_ACTION,
    DELETE_MESSAGE: callbacks.DELETE_MESSAGE,
    NEXT_FLAT: callbacks.NEXT_FLAT,
    PREVIOUS_FLAT: callbacks.PREVIOUS_FLAT,
    CANCEL_INTEREST: callbacks.CANCEL_INTEREST,
    SFDNF: callbacks.SFDNF,
};

module.exports = {
    commands: index,
    inlineCallBacks,
};
