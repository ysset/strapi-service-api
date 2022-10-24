module.exports = {
    ...require('./localisation'),
    ...require('./user'),
    getDate: require('./event/getDate'),
    getUserInfo: require('./event/getUserInfo'),
    dateStorage: require('./event/dateStorage'),
    eventStorage: require('./event/eventStorage'),
    getFilePath: require('./getFilePath'),
    actions: require('./actions'),
};
