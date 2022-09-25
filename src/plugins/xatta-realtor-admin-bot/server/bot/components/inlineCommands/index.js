const enterCommandFunc = require('./enterCommand');
const registerNewBotFunc = require('./registerNewBot');
const helpFunc = require('./help');

module.exports = {
    enterCommand: enterCommandFunc,
    registerNewBot: registerNewBotFunc,
    help: helpFunc,
};
