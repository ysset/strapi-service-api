const callbacks = require('./componentList');
const index = {
    START: {
        regex: /\/start/,
        fn: async (msg) => inlineCallBacks.ENTER_COMMAND(msg),
    },
};

const inlineCallBacks = {
    ENTER_COMMAND: callbacks.ENTER_COMMAND,
};

/**
 * @type {{inlineCallBacks: {ENTER_COMMAND: function(*): Promise<void>}, commands: {START: {regex: RegExp, fn: (function(*): Promise<void>)}}}}
 */
module.exports = {
    commands: index,
    inlineCallBacks,
};
