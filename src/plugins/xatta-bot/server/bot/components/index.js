const { modifyRequestWithUserData } = require('../../../botUtils/userController');
const callbacks = require('./componentList');

const index = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            await modifyRequestWithUserData({ msg });
            await inlineCallBacks.ENTER_COMMAND(msg);
            return inlineCallBacks.DELETE_MESSAGE(msg);
        },
    },
};

const inlineCallBacks = {
    SAVE: callbacks.SAVE,
    WRITE_AGENT: callbacks.WRITE_AGENT,
    SEARCH_FLATS: callbacks.SEARCH_FLATS,
    REPEAT_SEARCH_FLATS: callbacks.REPEAT_SEARCH_FLATS,
    FAVORITE_HOUSINGS: callbacks.FAVORITE_HOUSINGS,
    SFD: callbacks.SEARCH_FULL_DESCRIPTION,
    FFD: callbacks.FAVORITE_FULL_DESCRIPTION,
    FULL_DESCRIPTION: callbacks.FULL_DESCRIPTION,
    ENTER_COMMAND: callbacks.ENTER_COMMAND,
    DELETE_ACTION: callbacks.DELETE_ACTION,
    DELETE_MESSAGE: callbacks.DELETE_MESSAGE,
    NEXT_FLAT: callbacks.NEXT_FLAT,
};

module.exports = {
    commands: index,
    inlineCallBacks,
};
