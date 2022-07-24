const { modifyRequestWithUserData } = require('../../../botUtils/userController');
const callbacks = require('./componentList');

const index = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            //Always clear your text listeners to avoid conflicts
            await strapi.bots.alanyaBot.clearTextListeners();
            await modifyRequestWithUserData({ msg });
            return inlineCallBacks.ENTER_COMMAND(msg);
        },
    },
};

const inlineCallBacks = {
    NEXT: callbacks.NEXT,
    SAVE: callbacks.SAVE,
    WRITE_AGENT: callbacks.WRITE_AGENT,
    SEARCH_FLATS: callbacks.SEARCH_FLATS,
    REPEAT_SEARCH_FLATS: callbacks.REPEAT_SEARCH_FLATS,
    FAVORITE: callbacks.FAVORITE,
    FAVORITE_FLATS: callbacks.FAVORITE_FLATS,
    FULL_DESCRIPTION: callbacks.FULL_DESCRIPTION,
    SEARCH: callbacks.SEARCH,
    ENTER_COMMAND: callbacks.ENTER_COMMAND,
    DELETE_ACTION: callbacks.DELETE_ACTION,
};

module.exports = {
    commands: index,
    inlineCallBacks,
};
