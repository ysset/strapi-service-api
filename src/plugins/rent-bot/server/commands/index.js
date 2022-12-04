/**
 * @type {{START: {regex: RegExp, fn: function(*): Promise<void>}, CHANGE_DATE: {regex: RegExp, fn: function(*): Promise<*>}}}
 */
module.exports = {
    START: {
        regex: /\/start/,
        fn: require('./start'),
    },
    CHANGE_DATE: {
        regex: /\/date/,
        fn: require('./date'),
    },
};
