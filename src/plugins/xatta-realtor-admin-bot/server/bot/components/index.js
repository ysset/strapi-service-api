const callbacks = require('./componentList');
const inlineCallBacks = {
    ENTER_COMMAND: callbacks.ENTER_COMMAND,
    REGISTER: callbacks.REGISTER,
    HELP: callbacks.HELP,
};

/**
 * @type {{inlineCallBacks: {ENTER_COMMAND: function(*): Promise<void>}, commands: {START: {regex: RegExp, fn: (function(*): Promise<void>)}}}}
 */
module.exports = {
    commands: {
        START: {
            regex: /\/start/,
            fn: async (msg) => inlineCallBacks.ENTER_COMMAND(msg),
        },
        HELP: {
            regex: /\/help/,
            fn: async (msg) => inlineCallBacks.HELP(msg),
        },
        REGISTRATION: {
            regex: /\/registration/,
            fn: async (msg) => inlineCallBacks.REGISTER(msg),
        },
    },
    inlineCallBacks,
};
