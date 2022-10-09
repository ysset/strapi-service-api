/**
 * @type {{modifyRequestWithUserData?: ((function({msg: *}): Promise<*>)|(function({msg: *}): Promise<*>)), eventStorage: {callEvent: function(*): *, clearEvents: function(*): void, createEvent: function({telegramID: *, event: *}): void, events: *, isEvent: function(*): *}, beautifyParams?: (function(*): *), dateStorage: {isDate: function(*): *, dates: *, createDateFilter: function({telegramID: *, date: *}): void, deleteDate: function(*): void}, getUser?: ((function(*): Promise<{chatId: *, messageId: *, user: *}>)|(function(*): Promise<{chatId: *, messageId: *, user: *}>)), beautifyId?: (function(*): string), translateApartments?: (function(*): *), getDate: function(*): Promise<*>, getMonth?: (function(*, *): *)}}
 */
module.exports = {
    ...require('./localisation'),
    ...require('./user'),
    getDate: require('./event/getDate'),
    getUserInfo: require('./event/getUserInfo'),
    dateStorage: require('./event/dateStorage'),
    eventStorage: require('./event/eventStorage'),
};
