const getUser = require('../../../botUtils/userController');
const callbacks = require('./componentList');

const index = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            //Always clear your text listeners to avoid conflicts
            await strapi.bots.admin.clearTextListeners();
            await getUser({ msg });
            return inlineCallBacks.ENTER_COMMAND(msg);
        },
    },
};

const inlineCallBacks = {
    ENTER_COMMAND: callbacks.ENTER_COMMAND,
};

module.exports = {
    commands: index,
    inlineCallBacks,
};
