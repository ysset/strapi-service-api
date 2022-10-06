const enterCommandFunc = require('./enterCommand');
const registerNewBotFunc = require('./registerNewBot');
const helpFunc = require('./help');
const deleteCities = require('../../../../botUtils/userController/deleteCities');

module.exports = {
    enterCommand: enterCommandFunc,
    registerNewBot: registerNewBotFunc,
    help: helpFunc,
    deleteCities: deleteCities,
};
