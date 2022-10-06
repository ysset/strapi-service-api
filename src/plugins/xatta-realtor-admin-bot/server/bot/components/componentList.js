const { enterCommand, registerNewBot, help, deleteCities } = require('./inlineCommands');

const commands = {
    ENTER_COMMAND: enterCommand,
    REGISTER: registerNewBot,
    HELP: help,
    DELETE_CITIES: deleteCities,
};

module.exports = commands;
