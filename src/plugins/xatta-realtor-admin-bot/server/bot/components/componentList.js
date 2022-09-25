const { enterCommand, registerNewBot, help } = require('./inlineCommands');

const commands = {
    ENTER_COMMAND: enterCommand,
    REGISTER: registerNewBot,
    HELP: help,
};

module.exports = commands;
